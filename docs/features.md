# Overview of features

This section goes over the features that can be found in Armored Turtle Automated Filament Control (AFC) Software.

## Buffer Ram Sensor

AFC allows the use of the [supported buffers](./installation/buffer-overview.md#supported-buffers) as a ram sensor for
detecting when filament is loaded to the toolhead extruder. This can be used in place of a toolhead filament sensor. To
learn more about this feature please see [Buffer Ram Sensor](installation/buffer-ram-sensor.md) document.

Currently experimental, supported buffers can also detect clogs, jams and feeding issues before they result in a failed
print. See [buffer fault detection](installation/buffer-overview.md#buffer-fault-detection) section in buffer overview
for more information.


## Bypass

By default, if a hardware sensor is not set up for a bypass, AFC will create a virtual bypass filament sensor. Enabling
the virtual filament sensor disables AFC functionality, and the enabled state persists across reboots.

You can also enable AFC bypass with a hardware sensor by printing out a
[bypass](https://github.com/ArmoredTurtle/AFC-Accessories/tree/main/AFC_Bypass) accessory, connecting it inline after
your buffer and adding a bypass filament sensor to klipper config like below. Once filament is inserted into the bypass
side, the switch disables AFC functionality so you can print like normal.

```
[filament_switch_sensor bypass]
switch_pin: <replace with MCU pin that switch is connected to>
pause_on_runout: False
```

When either bypass is enabled/filament detect all AFC functionality with loading to the toolhead is disabled. Calling
the `TOOL_UNLOAD` macro will call the `UNLOAD_FILAMENT` macro if it exists so that filament can still be manually
unloaded from the toolhead.

### Toolhead Runout in Bypass Mode

By default, toolhead runout detection is disabled while printing in bypass/manual mode. If you want the toolhead
filament sensor to pause the print when the filament runs out during bypass printing, you can enable this behavior by
setting `enable_runout_in_bypass: True` in your configuration under the `[afc]` section.


## Lower stepper current when printing

For longer prints you may want to have the ability to lower BoxTurtles steppers current as they can get hot when engaged
for a long period of time.

Enabling lower current during printing can be enabled two ways:

1. Set `global_print_current` in AFC.cfg file
2. Set `print_current` for each AFC_stepper, this will override `global_print_current` in AFC.cfg

During testing, it was found that 0.6A worked well during printing and kept the steppers warm to the touch. We would not
suggest going lower than this or the TurtleNeck buffers may not work as intended when using BOM spec steppers.

## Enabling switches to show up in Mainsail/Fluidd GUIs

AFC has the ability to add sensors as filament switches so they show up in Mainsail/Fluidd web GUI. This can either be
enabled globally by adding/uncommenting `enable_sensors_in_gui: True` in AFC.cfg file or enabled/disabled in individual
sections in your config file. Enabling this globally is useful for debugging purposes, but setting in individual
sections will override the global setting.

AFC_buffer, AFC_extruder, AFC_hub, and AFC_stepper sections in your AFC_hardware.cfg or AFC_Turtle(n).cfg have the
ability to enable sensor by adding `enable_sensors_in_gui: True`. There is an extra config value for AFC_stepper to
allow you to either show both sensors or just prep/load sensors by using `sensor_to_show: prep` or
`sensor_to_show: load`, leaving out sensor_to_show will show both sensors.

## Tool change count

AFC has the ability to keep track of number of tool changes when doing multicolor prints. Number of toolchanges will be
pulled from files metadata stored in moonraker. AFC will keep track of tool changes and print out the current tool
change number when a T(n) command is called from gcode.


!!!note "Minimum Moonraker Version Required"

    Make sure moonraker version is at least v0.9.3-64 to utilize this feature.  

If you have set up your `Change filament G-code` section to use `SET_AFC_TOOLCHANGES` in your slicer please remove the
following lines:

```cfg
{ if toolchange_count == 1 }SET_AFC_TOOLCHANGES TOOLCHANGES=[total_toolchanges]{endif }
```

Also remove the following if added to your `PRINT_END` section as number of toolchanges will now automatically reset
back once print is done/canceled.

`SET_AFC_TOOLCHANGES TOOLCHANGES=0`

## Setting extruder temp

AFC has the ability to automatically set extruder temperature based on filament material type loaded or spoolman
extruder temperature if it's set.

If not using spoolman make sure the material is set for your lanes and the temperature values will be pulled from
`default_material_temps` variable in `AFC.cfg` file. This list can also be updated/added to, just make sure new entries
have a comma in between and follow current format when adding new variables.

If spoolman extruder temperature or material type is not defined AFC defaults to `min_extrude_temp` variable defined in
`[extruder]` section in `printer.cfg`

```cfg
default_material_temps: PLA:210, ABS:235, ASA:235 # Default temperature to set extruder when loading/unloading lanes.
```

If spoolman extruder temperature is defined but you wish to stick to the values in the `default_material_temps` variable
then you can set the `ignore_spoolman_material_temps` option to `true` in `AFC.cfg`

```cfg
ignore_spoolman_material_temps: True  # When True, AFC will ignore temperatures set in Spoolman and use default_material_temps instead.
```

While printing, if per-tool temperatures are available from the sliced file's metadata, AFC will check and set the
extruder temperature to the matching per-tool value when swapping lanes, rather than falling back to the lane's default
material temp. If you would like to restore the previous behavior of skipping this temperature check/set while printing
(when swapping lanes while printing and the extruder can already extrude), you can set the `disable_print_temp_check`
option to `true` in `AFC.cfg`

```cfg
disable_print_temp_check: True  # When True, restores the previous behavior of skipping the extruder temperature check/set when swapping lanes while printing and the extruder can already extrude.
```

See the [Multiple Extruder variables](configuration/AFC.cfg.md#multiple-extruder-variables-only) section for more
information.

## Loading filament to hub

For users that have a hub not located in their Box Turtle, AFC has the ability to load filament to their hub once its
inserted. This is turned on by default and this will happen even if your hub is located in your Box Turtle. This can be
disabled by setting `load_to_hub: False` in your `AFC.cfg` file. Also individual lanes can be turned on/off by setting
`load_to_hub: True/False` under `[AFC_stepper <lane_name>]` section in your config.

## Variable purge length on filament change

AFC has the ability to purge different lengths with Orca's flush volumes when doing filament changes with T(n) macros.
To use this feature update your Change Filament G-Code section in your orca slicer to the following:

`T[next_extruder] PURGE_LENGTH=[flush_length]`

Could also be added to your PRINT_START macro with a specific length, this would be ideal for if your first filament is
not currently loaded as the PURGE_LENGTH from Orca for the first change would be zero

`T{initial_tool} PURGE_LENGTH=100`

!!!warning "Important Note"

    If your first filament is not currently loaded and needs to change, `PURGE_LENGTH` will be zero and the poop macro
    will then use `variable_purge_length` from AFC_Macro_Vars.cfg file, so make sure this is set correctly for your
    printer

## Display Status Hook

AFC calls a generic macro, `_AFC_DISPLAY_STATUS`, around toolhead loading and unloading, letting any display integration
react without AFC needing to know which display you're using. The macro receives `VARIABLE` and `VALUE` parameters; AFC
currently sends `pushing` during load and `retraction` during unload, each set to `True` then `False`. Define a
`gcode_macro _AFC_DISPLAY_STATUS` in your config to forward it to your display of choice; if the macro isn't defined,
nothing happens.

A working example for the BTT KNOMI, with custom icons for several tool-change states, is available at
[rescosta/KNOMI](https://github.com/rescosta/KNOMI/tree/afc-tool-change-icons).


## TD-1 Support
AFC has the ability to grab data from TD-1 devices that are connected to your printer. More information about this and
setting it up can be found under [TD-1](td1.md) section.

## Exposing Lane Data for Third-Parties
AFC will store lane data in Moonraker's database at `<ip_address>/server/database/item?namespace=lane_data` so that
third-parties (like orca once support is added) can read this data and know what color, TD(if enabled), mapping,
material filament, etc. is in each lane.

Entries are keyed by `T(n)` mapping rather than by lane name, since a lane can be mapped to more than one `T(n)` macro
when [multiple mapping](#virtual-tools) is enabled. If a lane is mapped to more than one `T(n)`, its data is duplicated
under each mapped key so third-party tools can look up filament data by tool number directly.

Endpoint returns all mapped tools in system in a json format like the following:
```
{
    "namespace": "lane_data",
    "key": null,
    "value": {
        "T0": {
            "color": "#122B44",
            "td": 4.0,
            "material": "ASA",
            "vendor_name": "West3D",
            "name": "Armored Turtle Green",
            "bed_temp": 105,
            "nozzle_temp":245,
            "scan_time": "2025-09-14T03:13:27.189383Z",
            "lane": "0",
            "extruder_index": "0",
            "spool_id": 12345,
            "weight": "369",
            "initial_weight": "1000"
        },
        "T1": {
            "color": "#122B44",
            "td": 4.0,
            "material": "ASA",
            "vendor_name": "West3D",
            "name": "Rainbow Dolos",
            "bed_temp": 105,
            "nozzle_temp":245,
            "scan_time": "2025-09-14T03:13:27.189383Z",
            "lane": "1",
            "extruder_index": "0",
            "spool_id": 54321,
            "weight": "607",
            "initial_weight": "1000"
        },
        "T2": {
            "color": "",
            "material": "",
            "vendor_name": "",
            "name": "",
            "bed_temp": "",
            "nozzle_temp": "",
            "scan_time": "",
            "lane": "2",
            "extruder_index": "1",
            "spool_id": null,
            "weight": "",
            "initial_weight": ""
        }
    }
}
```

- Color: Current color filament loaded in lane, if filament was scanned with TD-1 then TD-1 scanned color is returned  
- TD : Transmission distance if TD-1 is connected and enabled in system  
- Material: Material from spoolman or when manually entered with
  [SET_MATERIAL](klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_SET_MATERIAL) macro  
- Vendor Name: Filament spool manufacturer
- Name: Filament product name
- Bed Temp: Bed temperature pulled from spoolman data  
- Nozzle Temp: Nozzle temperature pulled from spoolman data  
- Scan Time: Populated only when TD-1 is connected, enabled in the system, and filament has been scanned
- Lane: Tool number for this entry's `T(n)` key with the `T` stripped off. eg. entry key `T0` reports `"lane": "0"`  
- Extruder Index: Current extruder index that lane is attached to, useful in multi-toolhead setups where multiple lanes
  can be going to one toolhead. This variable is exposed so that third-party tools could use this variable to group
  filament/lanes attached to a single toolhead.
- Spool ID: Spool ID assigned to this lane via
  [SET_SPOOL_ID](klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_SET_SPOOL_ID) or
  [SET_NEXT_SPOOL_ID](klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_SET_NEXT_SPOOL_ID). Value is an integer when a
  spool is assigned, or `null` when the lane is empty/ejected
- Weight: Remaining filament weight left on the spool
- Initial Weight: Starting weight of a full spool of filament

!!! note

    Entries are keyed by `T(n)` as of version 1.3.0. Prior versions keyed entries by lane name (e.g. `lane1`) instead -
    update any third-party integration that reads this endpoint by lane name.
