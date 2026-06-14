!!! note
    Reminder if this MCU is going to be used on a Snapmaker U1, please flash with [u1-klipper](https://github.com/Snapmaker/u1-klipper) version instead of mainline Klipper/Kalico


## Make note of any toolhead sensor pins

If you are using [FilamATrix](https://github.com/thunderkeys/FilamATrix), and are using toolhead endstop sensors, make a
note of what MCU pins those sensors are connected to for the pre-extruder gear sensor (aka `pin_tool_start`) and
post-extruder gear sensor (`pin_tool_end`). Use these in the next step to properly install and configure AFC.

!!! note
    The `pin_tool_start` refers to the pin above the extruder gears, while the `pin_tool_end` refers to the pin below
    the extruder gears. If you are using a single sensor, you will only need to use the `pin_tool_start` pin.

An example of these pins and their locations can be seen in the diagram below:

![example-pins](../assets/images/example-cw2-revo.png)

If you do not have a native toolhead filament sensor, you can use either an inline filament sensor such
as [Filatector](https://github.com/ArmoredTurtle/Filatector), or you can use
the [TurtleNeck buffer](https://github.com/ArmoredTurtle/TurtleNeck) as a virtual toolhead endstop. Please
see [this guide](../installation/buffer-ram-sensor.md) for more details.
