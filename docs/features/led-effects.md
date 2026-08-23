# LED Effects

AFC can layer animated effects from the [klipper-led_effect](https://github.com/julianschill/klipper-led_effect)
plugin on top of its normal lane/extruder status LEDs. This is fully optional: if you don't define any matching
`[led_effect]` sections, AFC continues to just set static LED colors as it always has.

!!! warning "Install klipper-led_effect first"

    This feature requires the [klipper-led_effect](https://github.com/julianschill/klipper-led_effect) plugin.
    It is not bundled with AFC and must be installed separately - follow the installation instructions on its
    GitHub repository before continuing. None of the effects below will work until the plugin is installed
    correctly and Klipper service has been restarted.

## How it works

AFC already sets a static color on a lane/extruder's LED any time it changes state (ready, loading, fault, etc.),
using the `led_ready`, `led_loading`, `led_fault`, etc. options from your [AFC_lane/AFC_stepper](../configuration/AFC_UnitType_1.cfg.md#afc_lane-lane_name-section)
config. When AFC changes a lane or extruder's state, it now also looks for a `[led_effect <name>_<state>]` section
that matches the lane/extruder name and the state it just entered. If one exists, AFC calls `SET_LED_EFFECT` to
overlay that animation on top of the static color; if it doesn't exist, nothing else happens.

- `<name>` is the lane name (e.g. `lane1`) or extruder name (e.g. `extruder`) as defined in your config.
- `<state>` is one of the [callable states](#callable-states) below.
- Only that lane or extruder's own previously running effect is stopped when its state changes, so effects on
  other lanes/extruders are not interrupted.

!!! warning

    Since AFC itself calls `SET_LED_EFFECT` to start these effects, set `autostart: false` on every `[led_effect]`
    section used with this feature. Otherwise the effect will also start on its own at Klipper startup, fighting
    with AFC's static color.

## Installing klipper-led_effect

1. Install the plugin by following the instructions in the [klipper-led_effect repository](https://github.com/julianschill/klipper-led_effect).
2. Restart Klippers service once the plugin is installed.
3. Add `[led_effect <name>_<state>]` sections named to match your lanes/extruders and the states you want to
   animate, using the [AFC_led](../configuration/AFC_UnitType_1.cfg.md#afc_led-led_name-section) chain/indexes you
   already have configured for AFC's static LEDs. See [Example Configuration](#example-configuration) below.

## Callable States

| State | Applies to | Description |
|-------|-----------|--------------|
| `not_ready` | Lane only | Lane is empty, no spool prepped (prep and load sensors both `False`). |
| `loaded` | Lane only | Filament is staged and confirmed ready, behind the hub. |
| `loading` | Lane only | Filament is actively feeding into the lane, either loading to the toolhead or loading a spool into the lane itself. |
| `unloading` | Lane only | Filament is backing out of the lane, either unloading from the toolhead or ejecting from a lane. |
| `unloaded` | Lane only | Lane is no longer loaded, but a spool is still prepped (prep sensor still `True`). |
| `fault` | Lane only | Lane needs attention (jam, sensor mismatch, failed load/unload, etc). |
| `tool_loaded_gears` | Lane + extruder | Filament has reached the toolhead gears, part-way through a load, before `tool_loaded` fires. |
| `tool_loaded` | Lane + extruder | Lane is the active/loaded tool right now; fires on any tool change. |
| `tool_unloaded` | Lane + extruder | Tool was just unloaded from the toolhead. |
| `tool_loaded_idle` | Lane + extruder | Tool is loaded but idle/parked (e.g. on a toolchanger, toolhead is docked and lane is loaded into toolhead). |

For the four "Lane + extruder" states, AFC triggers both a `<lane_name>_<state>` effect and a matching
`<extruder_name>_<state>` effect at the same time, so you can animate the lane's LEDs and the toolhead's LEDs
together (or independently, by giving each its own colors/LED chain).

## Example Configuration

The following examples are from
[`templates/led_effects_examples.cfg`](https://github.com/AFCProject/AFC-Klipper-Add-On/blob/main/templates/led_effects_examples.cfg)
in the AFC-Klipper-Add-On repository. Update the `leds:` line and the LED index range/count on each `layers:` line
to match your own LED chain name and length before use - they will not work as-is with a different setup.

### Loading / Unloading

Rainbow gradient sweeps across the lane's LEDs. The pin order is reversed between loading and unloading so the
sweep visually travels in the direction filament is moving.

```cfg
[led_effect lane1_loading]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    # All RGB values reduced by 50% (e.g., 1.0 -> 0.5)
    gradient 1.0 1.0 add (0.5,0.0,0.0),(0.5,0.25,0.0),(0.5,0.5,0.0),(0.0,0.5,0.0),(0.0,0.0,0.5),(0.15,0.0,0.25)

[led_effect lane1_unloading]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (16,15,14,13,12,11,10,9)
layers:
    gradient 1.0 1.0 add (0.5,0.0,0.0),(0.5,0.25,0.0),(0.5,0.5,0.0),(0.0,0.5,0.0),(0.0,0.0,0.5),(0.15,0.0,0.25)
```

### Fault

Fast red blink - the most urgent-looking state, distinct from the slower red breathe used by `not_ready`/`unloaded`.

```cfg
[led_effect lane1_fault]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (16,15,14,13,12,11,10,9)
layers:
    blink 1.0 0.5 top (1.0,0.0,0.0)
```

### Not Ready / Loaded

Slow red breathe when the lane is empty, and the same slow breathe in the "good" color once filament is staged and
ready, so ready vs. empty is obvious at a glance.

```cfg
[led_effect lane1_not_ready]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    breathing 2.5 0 top (1.0,0.0,0.0)

[led_effect lane1_loaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    breathing 2.5 0 top (0.0,0.5,0.0)
```

### Unloaded

A quick decaying flash for feedback when a lane is unloaded but still has a spool prepped, before the LED settles
back into whichever state follows.

```cfg
[led_effect lane1_unloaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    strobe 2.0 3.0 add (1.0,0.0,0.0)
```

### Tool Loaded

Fires on both the lane and its extruder any time that lane becomes the active/loaded tool. Two chase layers moving
in opposite directions, blended with `add` so both stay visible as they cross - the closest thing to a "back and
forth" animation the effect plugin supports, since it has no true bounce/ping-pong on a single layer.

```cfg
[led_effect lane1_tool_loaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    chase 1.5 2 add (0.0,0.3,0.5),(0.0,0.15,0.25)
    chase -1.5 2 add (0.0,0.3,0.5),(0.0,0.15,0.25)

# Extruder counterpart, fires at the same time as lane1_tool_loaded. Named "extruder" here for a
# single toolhead setup - adjust to match your own [AFC_extruder] section name.
[led_effect extruder_tool_loaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    chase 1.5 2 add (0.0,0.3,0.5),(0.0,0.15,0.25)
    chase -1.5 2 add (0.0,0.3,0.5),(0.0,0.15,0.25)
```

### Tool Loaded (Gears)

Fires part-way through a load, once filament reaches the toolhead gears but before `tool_loaded` fires. Same blue
as `tool_loaded`, but a fast twinkle instead of a chase, so this intermediate step reads as distinct from the
completed load.

```cfg
[led_effect lane1_tool_loaded_gears]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    twinkle 5 .5 top (0.0,0.3,0.5),(0.0,0.15,0.25)

[led_effect extruder_tool_loaded_gears]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    twinkle 5 .5 top (0.0,0.3,0.5),(0.0,0.15,0.25)
```

### Tool Unloaded

Fast, sparse purple sparkle when a tool is just unloaded from the toolhead - reads as the tool's presence
dissipating, with no directionality needed.

```cfg
[led_effect lane1_tool_unloaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (16,15,14,13,12,11,10,9)
layers:
    twinkle 5 .5 top (0.5,0.0,0.5),(0.25,0.0,0.25)

[led_effect extruder_tool_unloaded]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (16,15,14,13,12,11,10,9)
layers:
    twinkle 5 .5 top (0.5,0.0,0.5),(0.25,0.0,0.25)
```

### Tool Loaded (Idle)

Tool loaded but idle, parked on dock between tool changes on a toolchanger. Slower breathe than `loaded` so "actively the
tool" vs. "just staged" feel distinct.

```cfg
[led_effect lane1_tool_loaded_idle]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    breathing 4.0 0 top (0.4,0.4,0,0)

[led_effect extruder_tool_loaded_idle]
autostart: false
frame_rate: 24
leds: AFC_led:AFC_Indicator (9,10,11,12,13,14,15,16)
layers:
    breathing 4.0 0 top (0.4,0.4,0,0)
```
