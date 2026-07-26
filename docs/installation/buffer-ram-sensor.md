# Buffer Ram Sensor

## Overview

Ram sensor is compatible with the supported buffers as described in [buffer overview](./buffer-overview.md) section.

- When using a switched sensor, AFC uses the advance pin to know when filament has reached your toolhead. 
- When using a FPS/PSF sensor, AFC knows filament has reached your toolhead once the ADC value exceeds the "homing_high_point" ADC value(defaulted to 0.7)

### Basic Functionality

During `TOOL_LOAD` filament will travel to buffer sensor and then execute the `afc_bowden_length` to the tool head

- If the buffer is expanded after the `afc_bowden_length` is complete then it will move forward with the tool load.
- If the buffer is not expanded after the `afc_bowden_length` then AFC will perform short moves until the buffer
  expands and the tool load will continue when homing is not enabled, if homing is enabled then AFC will do a slower home of
  `afc_bowden_length` until your buffer is expanded.
- After the `tool_stn` is complete the AFC will then pull back off the advance sensor, checking that it was loaded
  successfully and resetting the buffer.

During `TOOL_UNLOAD` AFC will perform the user specified macros (cut/tip shaping etc.).

- Once these macros are finished AFC will pull back to the trailing sensor to ensure consistent position of the
  buffer.
- The rest of the unload will follow.

### Verifying lane loaded to toolhead
During `PREP` if homing is enabled AFC can verify that filament is loaded to toolhead by advancing filament until the 
advance sensor is triggered. If the advance sensor does not trigger after a 200mm move, then AFC will give the following error:
```
Buffer toolhead loaded check failed for lane3. Please verify that lane3 is loaded to toolhead.
If lane is not loaded to toolhead then run AFC_RESET and choose lane3 to reset back to hub.
Once lane is reset run UNSET_LANE_LOADED macro.
```
To enable this feature add `enable_buffer_tool_check: True` to your AFC_Boxturtle/AFC_vivid etc. config section.

## Configuration

### Required Configuration

Under `[AFC_extruder extruder]` section:

`pin_tool_start: buffer`

- By setting the `pin_tool_start` to `buffer` the ram sensor will be enabled.

See [buffer hardware configuration](./buffer-overview.md#required-afc-hardware-configuration-options) section on how to setup specific buffer for your system.

Under `[AFC_extruder <extruder_name>]`, `[AFC_<unit_name> <name>]` or `[AFC_stepper lane(n)]`; the buffer name must be
defined. This allows having a buffer per extruder, unit or lane. Defining buffer in `AFC_stepper` config overrides
buffer variable being set in other places, and defining buffer in `AFC_<unit_name>` overrides buffer being set in
`AFC_extruder`.

Examples:

```
[AFC_extruder <extruder_name>]
buffer: Turtle_1
pin_tool_start: buffer
<rest_of_config>
```

```
[AFC_BoxTurtle <unit_name>]
buffer: Turtle_1
<rest_of_config>
```

```
[AFC_stepper <stepper_name>]
buffer: Turtle_1
<rest_of_config>
```

### Optional Configuration

Under `[AFC]` section in the `AFC.cfg` file:

`tool_max_load_checks: 4` can be set for the amount of times the AFC pulls back after load to come off the advance
 sensor.

- Default 4

`tool_max_unload_attempts: 4` can be set for the amount of repetitions AFC pulls back to trailing sensor during an unload.

- Default 4

See [AFC configuration page](../configuration/AFC.cfg.md#afc-section) for more information about these variables.

## Tuning

The following parameters should be tuned for the specific setup. These can be found in the `[AFC_hub <unit_name>]` 
section.
- `afc_bowden_length` should be set so that on unload the filament comes just short of the hub sensor.
- `tool_unload_stn` should be set so that on unload the filament clears the extruder.