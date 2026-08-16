# [AFC_Hardware.cfg] Configuration Overview

The `AFC_Hardware.cfg` file is used to typically define options such as the AFC extruder configuration, filament 
switch bypass sensors, and buffer configurations.

This file is typically located in the `~/printer_data/config/AFC` directory and is created during the installation 
of the AFC-Klipper-Add-On.

## [AFC_extruder extruder] Section

The following options are available in the `[AFC_extruder extruder]` section of the `AFC_Hardware.cfg` file. These options 
control the configuration of the AFC system when interfacing with the extruder / toolhead.

!!! note

    These options will most likely require the most amount of configuration and tuning.

``` cfg
[AFC_extruder extruder]
pin_tool_start: mcu:pin
#    MCU defined pin for filament sensor located before (pre) the
#    extruder gears. This is used to detect the presence of filament
#    before the extruder gears. 
pin_tool_end: mcu:pin
#    MCU defined pin for filament sensor located after (post) the
#    extruder gears. This is used to detect the presence of filament
#    after the extruder gears.
tool_stn: 72
#    Default: 72
#    See documentation for details on how to calculate this value. 
#    https://www.afcproject.dev/toolhead/calculation.html
tool_stn_unload: 100
#    Default: 100      
#    See documentation for details on how to calculate this value.
#    https://www.afcproject.dev/toolhead/calculation.html
tool_sensor_after_extruder: 0
#    Default: 0
#    Extra distance to move in mm once pre/post sensors are clear. 
#    Useful for when only using post sensor, so this distance can 
#    be the amount to move to clear extruder gears.
tool_unload_speed: 25
#    Default: 25      
#    Unload speed in mm/s when unloading toolhead.
tool_load_speed: 25             
#    Default: 25
#    Load speed in mm/s when unloading toolhead.
buffer: <buffer_name>
#    Buffer to use for extruder, this variable can be overridden 
#    per lane.
enable_sensors_in_gui: False
#    Default: False
#    Set to True toolhead sensors switches as filament sensors in 
#    Mainsail/Fluidd gui, overrides value set in AFC.cfg.
enable_tool_runout: True
#    Default: True
#    If enabled and toolhead sensor(s) detect filament not present while
#    printing AFC will pause printing. Inputting value here overrides global
#    value in AFC.cfg file
debounce_delay: 0
#    Default: 0
#    A period of time in seconds to debounce switches prior to detecting
#    runout. If switches are pressed and released during this delay,
#    the entire switch event is ignored.
#
#    This value overrides value set in AFC config section
extruder_name: <uses name from config section>
#    Default: name taken from the [AFC_extruder ...] section name.
#
#    If you use a custom section name (e.g. [AFC_extruder custom_name]),
#    you must set this option to the actual extruder name (e.g. extruder,
#    extruder1).
#
#    AFC requires the word "extruder" to appear either in the section name
#    or in this option. If a custom section name is used and extruder_name
#    is not provided, AFC will raise a configuration error instructing the
#    user to supply a valid extruder name.
```

### Temperature Settings
 
``` cfg
[AFC_extruder extruder]
deadband: 2
#    Default: 2
#    Temperature tolerance (°C) when checking if the extruder has reached
#    its target.
#    AFC considers the target reached when within ±deadband.
#    Increasing this value (e.g. 3–5) can help if the hotend oscillates
#    around the target temperature.
toolchange_temp_drop:0
#    Default: 0
#    Amount (°C) to lower this extruder’s temperature after it is deselected
#    during a toolchange. Applied immediately with no wait.
#
#    Set to 0 to disable temperature drop. Useful for faster tool swaps,
#    while non-zero values can help reduce oozing on inactive tools.
#
#    Overrides the global setting in AFC.cfg.
```

### Toolchanger Settings
 
!!! note
 
    The following options are only required for multi-toolhead toolchanger
    setups. Leave all of these unset for standard single-toolhead printers.
 
``` cfg
toolchanger_unit:
#    Default: <none>
#    Name of the AFC toolchanger this extruder belongs to.
#    Enables toolchanger features such as tool selection, swapping,
#    and AFC_SELECT_TOOL / AFC_UNSELECT_TOOL macros.
tool:
#    Default: <none>
#    Name of the tool as defined in your klipper toolchanger(KTC) configuration.
#
#    This value is used by AFC to look up the corresponding KTC
#    tool object and perform tool swaps through KTC.
map:
#    Default: <none>
#    Tool mapping label (e.g. T0, T1, etc).
#    Only needed when using a toolhead in standalone mode (not attached
#    to a unit such as AFC_BoxTurtle/NightOwl/etc) and need to override
#    KTC assigned T(n) macro.  This variable also allows a comma
#    separated list to be passed in.
custom_tool_swap:
#    Default: <none>
#    Custom macro to run when this tool is selected.
#    Replaces the default KTC SELECT_TOOL T<n> behavior.
#
#    Allows full control over tool pickup or activation behavior.
custom_unselect:
#    Default: <none>
#    Custom macro to run when this tool is deselected.
#    Replaces the default KTC UNSELECT_TOOL behavior.
#
#    Useful for custom docking, parking, or release routines.
enable_standalone_purge: True
#    Default: True
#    After loading a standalone tool AFC will purge the first time after the toolhead
#    is picked up if poop is enabled. This is needed so that the previous filament loaded
#    is purged out of the nozzle. If you purge standalone toolheads yourself, then this
#    variable can be set to False.
#
#    This variable overrides the global `AFC.cfg` value when set here.
```

#### LED Settings
 
!!! note
 
    All LED index values are 1-based and refer to positions within the LED
    chain defined by `led_name`. Indices assigned to `status_led_idx` and
    `nozzle_led_idx` must not overlap — AFC will raise a configuration
    error at startup if they do.
 
``` cfg
led_name:
#    Default: <none>
#    Name of the LED group used for this toolhead. Used for both status
#    indication and nozzle illumination.
#    Must match an LED defined in your Klipper config.
#
#    Example:
#      led_name: neopixel tool1_led
#
#    Required for AFC_SET_TOOLHEAD_LED and toolhead lighting control.
status_led_idx:
#    Default: <none>
#    Comma-separated LED index position(s) (1-based) within the led_name
#    chain reserved for AFC status indication. These LEDs reflect the
#    current lane/tool state (e.g. ready, loading, fault) and are excluded
#    from print lighting controlled by AFC_SET_EXTRUDER_LED macro.
#
#    Accepts a single index or a comma-separated list.
#
#    Leave unset if no LEDs are dedicated to status.
nozzle_led_idx:
#    Default: <none>
#    Comma-separated LED index position(s) (1-based) within the led_name
#    chain used for nozzle illumination. When set, AFC_SET_EXTRUDER_LED
#    macro toggles only these LEDs for print lighting instead of all non-status
#    LEDs in the chain. Leave unset to allow AFC_SET_EXTRUDER_LED macro to
#    toggle all LEDs not reserved by status_led_idx.
#
#    If not set, all LEDs except those in status_led_idx are used.
#    Must not overlap with status_led_idx.
```

### The following configs are only for Snapmaker U1 printers
``` cfg
u1_filament_sensor_name: 
#    Default: None
#    Required in AFC_extruder sections for Snapmaker U1 printers, 
#    this variable should be the name for your extruders toolhead sensor.
#    For example, if AFC_extruder config section is "extruder1", then
#    filament sensor name should be "e1_filament"
u1_park_detector_name:
#    Default: None
#    Required in AFC_extruder sections for Snapmaker U1 printers,
#    this variable should be the name for your extruders park detector sensor.
#    For example, if AFC_extruder config section is "extruder1", then
#    filament sensor name should be "extruder1"
```

## [AFC_buffer buffer_name] Section (Switch type)
The following options are available in the `[AFC_buffer buffer_name]` section of the `AFC_Hardware.cfg` file. These options
control the configuration of the AFC system when interfacing with a switched filament buffer(eg Turtle-Neck style).

``` cfg
[AFC_buffer buffer_name]
advance_pin: mcu:pin
#    MCU defined pin for advance sensor. Switched buffer type only.
trailing_pin: mcu:pin
#    MCU defined pin for trailing sensor. Switched buffer type only.
multiplier_high: 1.05
#    Default: 1.05 (1.15 for FPS_PSF buffer type)
#    Factor to move more filament through the secondary extruder.
multiplier_low: 0.95
#    Default: 0.95 (0.85 for FPS_PSF buffer type)
#    Factor to move less filament through the secondary extruder.
led_index: Buffer_Indicator:1
#    LED index for the buffer, used to control the buffer LED
#    (if present).
led_buffer_advancing: 0,0,1,0
#    Default: 0,0,1,0
#    Buffer led color when in advancing state, setting here 
#    overrides values in AFC.cfg
led_buffer_trailing: 0,1,0,0
#    Default: 0,1,0,0
#    Buffer led color when in trailing state, setting here 
#    overrides values in AFC.cfg
led_buffer_disable: 0,0,0,0.25
#    Default: 0,0,0,0.25
#    Buffer led color when in disable state, setting here 
#    overrides values in AFC.cfg
```

## [AFC_buffer buffer_name] Section (FPS_PSF type)

The following options are for when using an FPS (Filament Pressure Sensor), used by OpenAMS systems, or a PSF (Proportional Sync-Feedback) sensor by
[kashine6](https://github.com/kashine6/Proportional-Sync-Feedback-Sensor),
instead of the physical advance/trailing switches used by the default `switched` (TurtleNeck-style) buffer documented above.
FPS/PSF configs can be used as-is; see the `set_point`/`low_point`/`high_point` options below for their PSF-compatible aliases.
Other options not listed here work the same as the `switched` buffer type.

``` cfg
[AFC_buffer buffer_name]
type: FPS_PSF
#    Selects the analog pressure-sensor buffer instead of the default
#    switched (TurtleNeck-style) buffer.
adc_pin: mcu:pin
#    MCU defined ADC pin the pressure/tension sensor is wired to.
sample_count: 5
#    Default: 5
#    Number of ADC samples averaged into a single reading.
sample_time: 0.005
#    Default: 0.005
#    Time in seconds spent on each individual ADC sample.
report_time: 0.100
#    Default: 0.100
#    How often, in seconds, the ADC reports a new reading.
reversed: False
#    Default: False
#    Inverts the raw sensor reading, enable if the sensor reads backwards
#    (shows expanded instead of showing compressed, or vice versa).
set_point: 0.5
#    Default: 0.5
#    Target reading representing a centered/neutral buffer. Also
#    settable as neutral_point, set_point takes priority if both are set.
low_point: 0.1
#    Default: 0.1
#    Reading representing maximum stretch/tension. Also settable as
#    max_tension, low_point takes priority if both are set.
high_point: 0.9
#    Default: 0.9
#    Reading representing maximum compression. Also settable as
#    max_compression, high_point takes priority if both are set.
homing_high_point: 0.7
#    Default: 0.7
#    Reading used as the advance/triggered threshold when homing to
#    the buffer.
deadband: 0.30
#    Default: 0.30
#    Width of the neutral window centered on set_point where no
#    correction is applied.
multiplier_high: 1.15
#    Default: 1.15
#    Maximum rotation distance multiplier applied as the buffer nears
#    low_point, speeds up feed to catch up.
multiplier_low: 0.85
#    Default: 0.85
#    Minimum rotation distance multiplier applied as the buffer nears
#    high_point, slows down feed to compensate.
trailing_min_multiplier: 1.00
#    Default: 1.00
#    Minimum multiplier floor applied once the buffer starts trailing,
#    so small deviations still get a meaningful push.
multiplier_hysteresis: 0.003
#    Default: 0.003
#    Minimum absolute difference (e.g. 0.003 means a multiplier of
#    1.050 -> 1.052 is suppressed, but 1.050 -> 1.054 is not) a new
#    multiplier must differ from the last applied multiplier before
#    it's sent to the stepper. Filters out insignificant corrections
#    so update_rotation_distance isn't called every tick. Set to 0 to
#    disable and apply every computed change.
smoothing: 0.3
#    Default: 0.3
#    Exponential smoothing factor (0-0.95) applied to raw sensor
#    readings before correction runs.
update_interval: 0.25
#    Default: 0.25
#    Seconds between correction updates.
led_buffer_neutral: 1,1,1,1
#    Default: 1,1,1,1
#    Buffer led color when in neutral state, setting here 
#    overrides values in AFC.cfg
```
Set `enable_integral_correction` to True if you notice your sensor on the 
edge between Advancing/Trailing and Neutral state (eg. Sensor never showing
Neutral when printing)
``` cfg
enable_integral_correction: False
#    Default: False
#    Enables a slow-adapting correction that removes steady-state
#    offset caused by an inaccurate rotation_distance.
integral_gain: 0.004
#    Default: 0.004
#    Correction strength per second of active extrusion. Higher
#    converges faster but risks overshoot; tune gradually.
integral_extrusion_threshold: 0.02
#    Default: 0.02
#    Minimum mm the extruder must move per tick to count as actively
#    printing. Filters out idle time so it doesn't wind up the
#    correction for no reason.
```

## [AFC_led Buffer_Indicator] Section

The following options are available in the `[AFC_led Buffer_Indicator]` section of the `AFC_Hardware.cfg` file. These options
control the configuration of the AFC system when interfacing with the buffer LED.

``` cfg
[AFC_led Buffer_Indicator]
pin: mcu:pin 
#    MCU defined pin for the LED.
chain_count: 1
#    Default: 1
#    Number of LEDs in the chain.
color_order: GRB
#    Default: GRB
#    Color order of the LED chain.
initial_RED: 0.0
#    Initial RED value of the LED.
initial_GREEN: 0.0
#    Initial GREEN value of the LED.
initial_BLUE: 0.0
#    Initial BLUE value of the LED.
initial_WHITE: 0.0
#    Initial WHITE value of the LED.
```