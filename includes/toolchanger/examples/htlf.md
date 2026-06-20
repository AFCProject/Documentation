The following shows a complete example combining all three modes using an HTLF unit:
`lane1` and `lane2` in direct mode, `lane3` and `lane4` sharing `extruder2` via a hub,
and `extruder3` and `extruder4` in standalone mode with no unit lane attached.

**Directory structure:**

```
~/printer_data/config/AFC
├── AFC.cfg
├── AFC_Hardware.cfg          # AFC_extruder sections for all 6 toolheads
├── AFC_Toolchanger.cfg       # AFC_Toolchanger unit
├── AFC_MMB_HTLF_1.cfg        # HTLF unit, steppers, lanes, hub, LED, buffers
└── mcu/
    ├── HTLF_MMB_1.1.cfg
    ├── Turtlenest.cfg
    └── TurtleNeckv2.cfg
```

**`AFC_Toolchanger.cfg`: unit registration:**

Each lane connected directly or via a hub to a toolhead requires a dedicated buffer. In this
example, `TN0` serves `lane1`, `TN1` serves `lane2`, and `TN2` is shared by `lane3` and
`lane4` since they share a common bowden path through the hub.

```ini
[AFC_Toolchanger Tools]
```

**`AFC_Hardware.cfg`: all six extruders:**

```ini
# ── Direct mode ── lane1 → extruder (T0)
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

# ── Direct mode ── lane2 → extruder1 (T1)
[AFC_extruder extruder1]
pin_tool_start: buffer
tool_stn: 60
tool_stn_unload: 65
tool: tool T1
deadband: 10
toolchanger_unit: Tools
led_name: neopixel tool_1
status_led_idx: 3
nozzle_led_idx: 1-2

# ── Hub mode ── lane3 + lane4 → extruder2 (T2)
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

# ── Standalone mode ── extruder3 (mapped to T4)
[AFC_extruder extruder3]
pin_tool_start: nh36_3:gpio3
tool_stn: 60
tool_stn_unload: 65
tool: tool T3
deadband: 10
toolchanger_unit: Tools
map: T4
led_name: neopixel tool_3
status_led_idx: 3

# ── Standalone mode ── extruder4 with custom tool swap (mapped to T5)
[AFC_extruder extruder4]
pin_tool_start: nh36_4:gpio3
tool_stn: 60
tool_stn_unload: 65
tool: tool T4
deadband: 10
toolchanger_unit: Tools
map: T5
led_name: neopixel tool_4
status_led_idx: 3
custom_tool_swap: SELECT_TOOL T=4
custom_unselect: UNSELECT_TOOL

# ── Standalone mode ── extruder5 (mapped to T6)
[AFC_extruder extruder5]
pin_tool_start: nh36_5:gpio3
tool_stn: 60
tool_stn_unload: 65
tool: tool T4
deadband: 10
toolchanger_unit: Tools
map: T6
led_name: neopixel tool_5
status_led_idx: 3
```

**`AFC_MMB_HTLF_1.cfg`: HTLF unit with direct and hub lanes:**

```ini
[AFC_HTLF HTLF_1]
extruder: extruder
buffer: TN0
drive_stepper: HTLF_Drive
selector_stepper: HTLF_Selector
home_pin: MMB:HOME_POS
cam_angle: 60
MAX_ANGLE_MOVEMENT: 220
mm_move_per_rotation: 40
long_moves_speed: 150
long_moves_accel: 50

# ── Direct mode: lane1 → extruder ──
[AFC_lane lane1]
unit: HTLF_1:1
extruder: extruder
buffer: TN0
hub: direct
dist_hub: 1555.0
map: T0
load: !MMB:LOAD1
led_index: AFC_Indicator_HTLF_1:4

# ── Direct mode: lane2 → extruder1 ──
[AFC_lane lane2]
unit: HTLF_1:2
extruder: extruder1
buffer: TN1
hub: direct
dist_hub: 1533.86
map: T1
load: !MMB:LOAD2
led_index: AFC_Indicator_HTLF_1:3

# ── Hub mode: lane3 → hub → extruder2 ──
[AFC_lane lane3]
unit: HTLF_1:3
extruder: extruder2
buffer: TN2
hub: HTLF_1
dist_hub: 619.08
map: T2
load: !MMB:LOAD3
led_index: AFC_Indicator_HTLF_1:2

# ── Hub mode: lane4 → hub → extruder2 ──
[AFC_lane lane4]
unit: HTLF_1:4
extruder: extruder2
buffer: TN2
hub: HTLF_1
dist_hub: 765.0
map: T4
load: !MMB:LOAD4
led_index: AFC_Indicator_HTLF_1:1

[AFC_hub HTLF_1]
switch_pin: ^turtleneck:gpio14
afc_bowden_length: 1086.77
move_dis: 60

[AFC_led AFC_Indicator_HTLF_1]
pin: MMB:RGB1
chain_count: 4
color_order: GRBW

[AFC_buffer TN0]
advance_pin: ^!turtlenest:TN0_ADV
trailing_pin: ^!turtlenest:TN0_TRL
multiplier_high: 1.15
multiplier_low: 0.90

[AFC_buffer TN1]
advance_pin: ^!turtlenest:TN1_ADV
trailing_pin: ^!turtlenest:TN1_TRL
multiplier_high: 1.15
multiplier_low: 0.90

[AFC_buffer TN2]
advance_pin: ^turtleneck:gpio4
trailing_pin: ^turtleneck:gpio5
multiplier_high: 1.15
multiplier_low: 0.90
```
