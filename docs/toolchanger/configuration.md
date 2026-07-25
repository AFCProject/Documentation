# Toolchanger Configuration

!!! warning "Toolchanger support is currently in beta"
    Toolchanger support in AFC is still in active development. While functional, you may
    encounter bugs or rough edges. If you run into issues, please reach out first in the
    [Armored Turtle Discord](https://discord.gg/z2tgWEnfDT) for help and discussion. If the
    issue is confirmed, please also report it on the
    [AFC-Klipper-Add-On GitHub](https://github.com/AFCProject/AFC-Klipper-Add-On/issues)
    so it can be tracked and resolved.

## Required Configuration

### `[AFC_Toolchanger]` Section

An `[AFC_Toolchanger]` section must be defined to register a toolchanger unit with AFC.
Only one section is required per toolchanger system, regardless of how many toolheads it has.

```ini
[AFC_Toolchanger Tools]
```

!!! note
    The name following `AFC_Toolchanger` (e.g. `Tools`) is the unit name. This name is
    referenced by each `[AFC_extruder]` section via the `toolchanger_unit` option. This
    config does not have to be called `Tools` it can be called whatever you like, but it
    always needs to be referenced by this new name when adding to your `AFC_extruder`
    sections as described in the next section.

---

### `[AFC_extruder]` Toolchanger Settings

Every toolhead in the system requires its own `[AFC_extruder]` section. The following options
are specific to toolchanger setups and must be set on each extruder that participates in tool
selection.

The following config is meant as an example for what additional values are needed to
add to the existing `AFC_extruder` config for toolchangers as described on the
[AFC_extruder](../configuration/AFC_Hardware.cfg.md#afc_extruder-extruder-section)
config page. Only add the additional variables from below that are required for your setup.
Multiple `AFC_extruder` config sections are needed, if you have 4 toolheads then you need to make
sure you have 4 `AFC_extruder` config sections even if your toolhead is being used in standalone mode.

Currently standalone toolheads require a toolhead sensor, as this is how AFC knows when a standalone
toolhead is loaded.

!!! note
    These options are only required for multi-toolhead toolchanger setups. Leave all of
    these unset for standard single-toolhead printers.

```ini
[AFC_extruder extruder]
#    Name of the AFC_Toolchanger this extruder belongs to.
#    Must match the name used in your [AFC_Toolchanger] section.
toolchanger_unit: Tools

#    Name of the tool as defined in your klipper-toolchanger configuration.
#    AFC currently uses this to look up the corresponding tool object and
#    perform tool swaps through klipper-toolchanger. This option will be
#    updated as tool swap handling moves into AFC in a future release.
tool: tool T0

#    Tool mapping label (e.g. T0, T1, etc).
#    Only needed when the toolhead is in standalone mode (not attached to
#    a unit such as AFC_BoxTurtle/HTLF/etc) and you need to override
#    the T(n) macro assigned by klipper-toolchanger. This behavior is
#    expected to change as tool swap handling moves into AFC.
map: T0

#    Default: <none>  Optional.
#    Custom macro to run when this tool is selected, replacing the default
#    SELECT_TOOL T<n> behavior. Only needed if your setup requires a
#    non-standard selection sequence, for example, an IDEX machine where
#    tool activation differs from a standard toolchanger. This option will
#    evolve as tool swap handling moves into AFC in a future release.
custom_tool_swap: SELECT_TOOL T=0

#    Default: <none>  Optional.
#    Custom macro to run when this tool is deselected, replacing the default
#    UNSELECT_TOOL behavior. Only needed if your setup requires a non-standard
#    deselection sequence, such as on an IDEX machine.
custom_unselect: UNSELECT_TOOL
```

---

## Lane-to-Toolhead Connection Modes

### Direct Mode

Use **direct** mode when a single lane connects straight to a dedicated toolhead with no hub
in between. The filament path runs from the unit's lane extruder directly to that toolhead's
load sensor.

This is the simplest configuration and is recommended when each toolhead has its own dedicated
lane on the unit. In this example, `lane1` on the HTLF connects directly to `extruder`, and
`lane2` connects directly to `extruder1`. Each lane has its own independent filament path with
no shared components.

There are two direct mode values available for the `hub` option:

| Value | Behavior |
|---|---|
| `direct` | Lane loads filament to the ready state and waits. A `TOOL_LOAD`, `CHANGE_TOOL` or `T(n)` command must be issued manually or via a toolchange to load filament the rest of the way to the toolhead. |
| `direct_load` | Same as `direct`, but when the prep sensor detects a spool being inserted, AFC automatically triggers `TOOL_LOAD` and loads filament all the way to the toolhead without any user intervention. |

Use `direct_load` if you want the toolhead to be loaded automatically as soon as a spool is
inserted into the lane, your printer also must be homed for this load to be successful when inserting filament. Use `direct` if you prefer to control when the toolhead is loaded
manually.

!!! warning
    A buffer is **required** for each lane when using direct or direct_load modes. The buffer monitors filament
    advance and trail states to prevent slack or over-tension in the bowden path during
    toolchanges. Ensure each lane has a corresponding `[AFC_buffer]` section defined and
    referenced via the `buffer` option on the lane.

**Lane configuration example:**

```ini
# Since this example is for an HTLF unit type, other unit types may use
# AFC_stepper in place of AFC_lane. Only the commented variables below are
# important for a toolchanger setup.
[AFC_lane lane1]
unit: HTLF_1:1
#    Extruder variable needs to be set to the correct extruder name that
#    this lane is directly attached to.
extruder: extruder
#    Buffer variable needs to be set to the correct AFC_buffer name that
#    this lane uses.
buffer: TN0
#    Set to `direct` when this lane connects directly to the toolhead
#    with no hub in between. Use `direct_load` instead to have AFC
#    automatically load filament to the toolhead when a spool is inserted
#    into the lane.
hub: direct
#    Distance in mm from the lane extruder to the toolhead load sensor.
#    This replaces afc_bowden_length for direct connections.
#    Run AFC_CALIBRATION to calibrate this value automatically.
dist_hub: 1555.0
#    Lane's that will map the same and klipper-toolchanger need to have
#    this override here to override and replace klipper-toolchanger T(n) macro.
map: T0
load: !MMB:LOAD1
led_index: AFC_Indicator_HTLF_1:4
```

**Extruder configuration example:**

```ini
[AFC_extruder extruder]
pin_tool_start: nh36_0:gpio3
tool_stn: 60.0
tool_stn_unload: 65.0
tool: tool T0
deadband: 10
toolchanger_unit: Tools
led_name: neopixel tool_0
status_led_idx: 3
nozzle_led_idx: 1-2
```

!!! note
    When using `hub: direct`, the `dist_hub` value on the lane takes the place of
    `afc_bowden_length`. There is no `[AFC_hub]` section required for these lanes.

---

### Hub Mode (Multiple Lanes, One Toolhead)

Use **hub** mode when two or more lanes from a unit share a single toolhead through a physical
hub. The hub acts as a selector point; only one lane is active at a time, and filament travels
from the hub through a shared bowden tube to the toolhead.

This mode requires an `[AFC_hub]` section to be defined and referenced by each sharing lane.
In this example, `lane3` and `lane4` on the HTLF both route through `AFC_hub HTLF_1` to reach
`extruder2`. AFC manages which lane is active and sequences filament through the hub
accordingly.

!!! warning
    A buffer is **required** for all lanes sharing a hub when connecting to a toolhead. All
    lanes routing through the same hub should reference the same `[AFC_buffer]` section since
    they share a common bowden path to the toolhead. Ensure a `[AFC_buffer]` section is defined
    and referenced via the `buffer` option on each lane.

**Hub configuration:**

```ini
[AFC_hub HTLF_1]
switch_pin: ^turtleneck:gpio14
#    Length of the bowden tube in mm from the hub to the toolhead sensor.
#    Run AFC_CALIBRATION to calibrate this value automatically.
afc_bowden_length: 1086.77
move_dis: 60
```

**Lane configuration (both lanes reference the same hub, buffer and extruder):**

```ini
[AFC_lane lane3]
unit: HTLF_1:3
#    Both lane3 and lane4 point to the same extruder. AFC manages
#    which lane is active and routes filament through the hub.
extruder: extruder2
buffer: TN2
#    Set to the name of the [AFC_hub] section shared by these lanes.
hub: HTLF_1
dist_hub: 619.08
map: T2
load: !MMB:LOAD3
led_index: AFC_Indicator_HTLF_1:2

[AFC_lane lane4]
unit: HTLF_1:4
extruder: extruder2
buffer: TN2
hub: HTLF_1
dist_hub: 765.0
map: T3
load: !MMB:LOAD4
led_index: AFC_Indicator_HTLF_1:1
```

**Extruder configuration (shared by both lanes):**

```ini
[AFC_extruder extruder2]
pin_tool_start: nh36_2:gpio3
tool_stn: 60
tool_stn_unload: 65
tool: tool T2
deadband: 10
toolchanger_unit: Tools
led_name: neopixel tool_2
status_led_idx: 3
nozzle_led_idx: 1-2
```

!!! warning
    When two lanes share an extruder via a hub, both lanes must reference the same
    `hub` name, `buffer` name and `extruder` name. AFC uses the hub sensor to arbitrate
    which lane is active. Ensure your hub switch pin is correctly wired and configured.

---

### Standalone Mode

Use **standalone** mode for a toolchanger toolhead that has no AFC unit or lane attached.
The extruder still participates in AFC's tool selection and status tracking, but filament
management (loading, unloading) is handled independently, either manually loaded or managed
by the toolhead itself.

In standalone mode, the `[AFC_extruder]` section is treated directly as an AFC lane. No
`[AFC_lane]` or unit section is required. In this example, `extruder3` and `extruder4` are
both configured this way; they are part of the `Tools` toolchanger unit and participate in
tool selection, but have no HTLF lane feeding them.

**Extruder configuration:**

```ini
[AFC_extruder extruder3]
pin_tool_start: nh36_3:gpio3
tool_stn: 60
tool_stn_unload: 65
tool: tool T3
deadband: 10
toolchanger_unit: Tools
#    When in standalone mode, use `map` to set the T(n) label for
#    this toolhead. This currently overrides the default tool number
#    assigned by klipper-toolchanger and will be updated as tool swap
#    handling moves into AFC.
map: T4
led_name: neopixel tool_3
status_led_idx: 3
```

!!! note
    Standalone extruders appear in the `AFC_Toolchanger` unit within AFC's var file
    with `hub: direct`. They are tracked for load/prep state via their toolhead sensor
    but do not participate in AFC's filament loading sequences.

---

### Complete Examples

=== "HTLF Mixed"
    --8<-- "includes/toolchanger/examples/htlf.md"

=== "BoxTurtle Mixed"
    --8<-- "includes/toolchanger/examples/boxturtle.md"

---

## `custom_tool_swap` and `custom_unselect`

By default, AFC triggers tool selection by calling `SELECT_TOOL T=<n>` through
klipper-toolchanger, where `<n>` is derived from the extruder name (e.g. `extruder1` → `T=1`).
If your toolchanger numbering does not match this scheme, for example, if klipper-toolchanger
assigns a different index to a tool, or requires custom tool-selection behavior (e.g. IDEX), you
can override the selection and deselection macros per extruder.

These options are particularly useful for IDEX setups. IDEX machines typically do not use
klipper-toolchanger and instead rely on custom macros to handle toolhead activation and
parking. By setting `custom_tool_swap` and `custom_unselect` to your existing IDEX macros,
AFC can trigger the correct tool swap sequence without requiring klipper-toolchanger to be
installed at all.

!!! note
    AFC currently delegates physical tool swap operations to klipper-toolchanger via
    `SELECT_TOOL` and `UNSELECT_TOOL`. Tool swap handling is planned to move into AFC
    directly in a future release, at which point these options may change.

```ini
[AFC_extruder extruder4]
#    Runs this exact macro instead of the default SELECT_TOOL T=<n>.
#    Use when the AFC extruder index does not match the klipper-toolchanger
#    tool number.
custom_tool_swap: TOOL4

#    Runs this macro when the tool is deselected. Replaces the default
#    UNSELECT_TOOL call.
custom_unselect: PARK_TOOL
```

!!! note
    If `custom_tool_swap` and `custom_unselect` are not set, AFC falls back to the default
    klipper-toolchanger `SELECT_TOOL T=<n>` and `UNSELECT_TOOL` behavior.

---

### Example configuration

--8<-- "includes/toolchanger/examples/idex.md"

---

## Toolhead LED Configuration

Each toolhead can have its own NeoPixel LED chain for status indication and nozzle
illumination. AFC manages these independently per extruder.

```ini
[AFC_extruder extruder]
#    Name of the LED group used for this toolhead. Must match a
#    [neopixel] section defined in your Klipper configuration.
led_name: neopixel tool_0

#    1-based index of the LED(s) within the chain reserved for AFC
#    status indication (ready, loading, fault, etc).
#    Accepts a single index or a comma-separated list.
status_led_idx: 3

#    1-based index of the LED(s) used for nozzle illumination.
#    AFC_SET_TOOLHEAD_LED toggles only these LEDs for print lighting.
#    Must not overlap with status_led_idx.
nozzle_led_idx: 1-2
```

!!! warning
    `status_led_idx` and `nozzle_led_idx` must not overlap. AFC will raise a configuration
    error at startup if they share any index values.

---

## Summary: Mode Selection Reference

| Scenario | `hub` value on lane | `extruder` on lane | `[AFC_hub]` required |
|---|---|---|---|
| One lane → one dedicated toolhead | `direct` or `direct_load` | unique per lane | No |
| Two or more lanes → one toolhead via hub | hub section name (e.g. `HTLF_1`) | same for all sharing lanes | Yes |
| Standalone toolhead, no AFC lane | *(no lane; use `[AFC_extruder]` only)* | N/A | No |