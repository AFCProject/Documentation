The following shows a complete real-world example using two BoxTurtle units instead of an
HTLF: `Turtle_1` provides four lanes in direct mode, each feeding its own dedicated toolhead,
while `Turtle_2` provides four lanes sharing a single hub that feeds one shared toolhead.

!!! note
    On a BoxTurtle, each `[AFC_stepper]` section defines both the lane's stepper motor and
    its AFC lane behavior in a single section. This differs from the HTLF example above,
    where `[AFC_lane]` and the stepper driver are configured separately.

**Directory structure:**

```text
~/printer_data/config/AFC
├── AFC.cfg
├── AFC_Hardware.cfg          # AFC_extruder sections for all five toolheads
├── AFC_Toolchanger.cfg       # AFC_Toolchanger unit
├── AFC_Turtle_1.cfg          # BoxTurtle unit, direct-mode lanes, buffers
├── AFC_Turtle_2.cfg          # BoxTurtle unit, hub-mode lanes, hub, buffer
└── mcu/
    ├── AFC_Lite.cfg
    ├── AFC_Turtle_2_mcu.cfg
    └── Turtlenest.cfg
```

**`AFC_Toolchanger.cfg`: unit registration:**

```ini
[AFC_Toolchanger Tools]
```

**`AFC_Hardware.cfg`: all five extruders:**

```ini
# Direct mode: lane2 on Turtle_1 -> extruder1 (red_head)
[AFC_extruder extruder1]
tool_unload_speed: 25
tool_load_speed: 25
tool: tool red_head
deadband: 10
toolchanger_unit: Tools
led_name: neopixel sb_leds_red
status_led_idx: 1
nozzle_led_idx: 2-3

# Direct mode: lane3 on Turtle_1 -> extruder2 (green_head)
[AFC_extruder extruder2]
tool_unload_speed: 25
tool_load_speed: 25
tool: tool green_head
deadband: 10
toolchanger_unit: Tools
led_name: neopixel sb_leds_green
status_led_idx: 1
nozzle_led_idx: 2-3

# Direct mode: lane1 on Turtle_1 -> extruder3 (white_head)
[AFC_extruder extruder3]
tool_unload_speed: 25
tool_load_speed: 25
tool: tool white_head
deadband: 10
toolchanger_unit: Tools
led_name: neopixel sb_leds_white
status_led_idx: 1
nozzle_led_idx: 2-3

# Direct mode: lane4 on Turtle_1 -> extruder4 (black_head)
[AFC_extruder extruder4]
tool_unload_speed: 25
tool_load_speed: 25
tool: tool black_head
deadband: 10
toolchanger_unit: Tools
led_name: neopixel sb_leds_black
status_led_idx: 1
nozzle_led_idx: 2-3

# Hub mode: lane5/6/7/8 on Turtle_2 -> extruder (blue_head)
[AFC_extruder extruder]
tool_unload_speed: 25
tool_load_speed: 25
tool: tool blue_head
deadband: 10
toolchanger_unit: Tools
led_name: neopixel sb_leds
status_led_idx: 1
nozzle_led_idx: 2-3
```

!!! note
    The `tool` option on each extruder points to the matching `[tool]` section in your
    klipper-toolchanger `toolchanger.cfg`, not to the AFC lane or extruder name.

**`AFC_Turtle_1.cfg`: BoxTurtle unit with four direct-mode lanes:**

Each lane on `Turtle_1` is wired directly to its own toolhead with no shared hub, so
`load_to_hub` is disabled per lane since there is no hub to fast-load filament into. Each
lane also has its own dedicated buffer.

```ini
[AFC_BoxTurtle Turtle_1]
enable_assist: True
enable_kick_start: True

[AFC_stepper lane1]
map: T4
unit: Turtle_1:1
step_pin: Turtle_1:M1_STEP
dir_pin: !Turtle_1:M1_DIR
enable_pin: !Turtle_1:M1_EN
rotation_distance: 4.65
dist_hub: 1396.49
led_index: AFC_Indicator:1
afc_motor_rwd: Turtle_1:MOT1_RWD
afc_motor_fwd: Turtle_1:MOT1_FWD
afc_motor_enb: Turtle_1:MOT1_EN
prep: ^!Turtle_1:TRG1
load: ^Turtle_1:EXT1
hub: direct
buffer: TN_white
extruder: extruder3
load_to_hub: False

[tmc2209 AFC_stepper lane1]
uart_pin: Turtle_1:M1_UART
run_current: 0.7
sense_resistor: 0.110

[AFC_stepper lane2]
map: T5
unit: Turtle_1:2
step_pin: Turtle_1:M2_STEP
dir_pin: !Turtle_1:M2_DIR
enable_pin: !Turtle_1:M2_EN
rotation_distance: 4.65
dist_hub: 1375.59
led_index: AFC_Indicator:2
afc_motor_rwd: Turtle_1:MOT2_FWD
afc_motor_fwd: Turtle_1:MOT2_RWD
afc_motor_enb: Turtle_1:MOT2_EN
prep: ^!Turtle_1:TRG2
load: ^Turtle_1:EXT2
hub: direct
buffer: TN_red
extruder: extruder1
load_to_hub: False

[tmc2209 AFC_stepper lane2]
uart_pin: Turtle_1:M2_UART
run_current: 0.7
sense_resistor: 0.110

[AFC_stepper lane3]
map: T6
unit: Turtle_1:3
step_pin: Turtle_1:M3_STEP
dir_pin: !Turtle_1:M3_DIR
enable_pin: !Turtle_1:M3_EN
rotation_distance: 4.65
dist_hub: 1445.47
led_index: AFC_Indicator:3
afc_motor_rwd: Turtle_1:MOT3_FWD
afc_motor_fwd: Turtle_1:MOT3_RWD
afc_motor_enb: Turtle_1:MOT3_EN
prep: ^!Turtle_1:TRG3
load: ^Turtle_1:EXT3
hub: direct
buffer: TN_green
extruder: extruder2
load_to_hub: False

[tmc2209 AFC_stepper lane3]
uart_pin: Turtle_1:M3_UART
run_current: 0.7
sense_resistor: 0.110

[AFC_stepper lane4]
map: T7
unit: Turtle_1:4
step_pin: Turtle_1:M4_STEP
dir_pin: !Turtle_1:M4_DIR
enable_pin: !Turtle_1:M4_EN
rotation_distance: 4.65
dist_hub: 1365.19
led_index: AFC_Indicator:4
afc_motor_rwd: Turtle_1:MOT4_FWD
afc_motor_fwd: Turtle_1:MOT4_RWD
afc_motor_enb: Turtle_1:MOT4_EN
prep: ^!Turtle_1:TRG4
load: ^Turtle_1:EXT4
hub: direct
buffer: TN_black
extruder: extruder4
load_to_hub: False

[tmc2209 AFC_stepper lane4]
uart_pin: Turtle_1:M4_UART
run_current: 0.7
sense_resistor: 0.110

[AFC_led AFC_Indicator]
pin: Turtle_1:RGB1
chain_count: 4
color_order: GRBW

[AFC_buffer TN_white]
advance_pin: ^!turtlenest:TN0_ADV
trailing_pin: ^!turtlenest:TN0_TRL
multiplier_high: 1.15
multiplier_low: 0.90

[AFC_buffer TN_red]
advance_pin: ^!turtlenest:TN1_ADV
trailing_pin: ^!turtlenest:TN1_TRL
multiplier_high: 1.15
multiplier_low: 0.90

[AFC_buffer TN_green]
advance_pin: ^!turtlenest:TN2_ADV
trailing_pin: ^!turtlenest:TN2_TRL
multiplier_high: 1.15
multiplier_low: 0.90

[AFC_buffer TN_black]
advance_pin: ^!turtlenest:TN3_ADV
trailing_pin: ^!turtlenest:TN3_TRL
multiplier_high: 1.15
multiplier_low: 0.90
```

**`AFC_Turtle_2.cfg`: BoxTurtle unit with four hub-mode lanes sharing one toolhead:**

Lanes on `Turtle_2` do not set `hub` or `extruder` individually since all four lanes share
the same hub and toolhead defined at the unit level. AFC falls back to these unit-level
defaults for any lane that does not override them.

```ini
[AFC_BoxTurtle Turtle_2]
hub: Turtle_2
extruder: extruder
enable_assist: True
enable_kick_start: True
buffer: Turtle_2

[AFC_stepper lane5]
map: T0
unit: Turtle_2:1
step_pin: Turtle_2:M1_STEP
dir_pin: Turtle_2:M1_DIR
enable_pin: !Turtle_2:M1_EN
rotation_distance: 54.5640483
gear_ratio: 44:10, 37:17
dist_hub: 163.55
led_index: AFC_Indicator_2:1
afc_motor_rwd: Turtle_2:MOT1_FWD
afc_motor_fwd: Turtle_2:MOT1_RWD
afc_motor_enb: Turtle_2:MOT1_EN
prep: ^!Turtle_2:TRG1
load: ^Turtle_2:EXT1

[tmc2209 AFC_stepper lane5]
uart_pin: Turtle_2:M1_UART
run_current: 1.0
sense_resistor: 0.110
interpolate: True

[AFC_stepper lane6]
map: T1
unit: Turtle_2:2
step_pin: Turtle_2:M2_STEP
dir_pin: Turtle_2:M2_DIR
enable_pin: !Turtle_2:M2_EN
rotation_distance: 54.5640483
gear_ratio: 44:10, 37:17
dist_hub: 108.17
led_index: AFC_Indicator_2:2
afc_motor_rwd: Turtle_2:MOT2_FWD
afc_motor_fwd: Turtle_2:MOT2_RWD
afc_motor_enb: Turtle_2:MOT2_EN
prep: ^!Turtle_2:TRG2
load: ^Turtle_2:EXT2

[tmc2209 AFC_stepper lane6]
uart_pin: Turtle_2:M2_UART
run_current: 1.0
sense_resistor: 0.110
interpolate: True

[AFC_stepper lane7]
map: T2
unit: Turtle_2:3
step_pin: Turtle_2:M3_STEP
dir_pin: Turtle_2:M3_DIR
enable_pin: !Turtle_2:M3_EN
rotation_distance: 54.5640483
gear_ratio: 44:10, 37:17
dist_hub: 112.61
led_index: AFC_Indicator_2:3
afc_motor_rwd: Turtle_2:MOT3_RWD
afc_motor_fwd: Turtle_2:MOT3_FWD
afc_motor_enb: Turtle_2:MOT3_EN
prep: ^!Turtle_2:TRG3
load: ^Turtle_2:EXT3

[tmc2209 AFC_stepper lane7]
uart_pin: Turtle_2:M3_UART
run_current: 1.0
sense_resistor: 0.110
interpolate: True

[AFC_stepper lane8]
map: T3
unit: Turtle_2:4
step_pin: Turtle_2:M4_STEP
dir_pin: Turtle_2:M4_DIR
enable_pin: !Turtle_2:M4_EN
rotation_distance: 54.5640483
gear_ratio: 44:10, 37:17
dist_hub: 174.94
led_index: AFC_Indicator_2:4
afc_motor_rwd: Turtle_2:MOT4_FWD
afc_motor_fwd: Turtle_2:MOT4_RWD
afc_motor_enb: Turtle_2:MOT4_EN
prep: ^!Turtle_2:TRG4
load: ^Turtle_2:EXT4

[tmc2209 AFC_stepper lane8]
uart_pin: Turtle_2:M4_UART
run_current: 1.0
sense_resistor: 0.110
interpolate: True

[AFC_hub Turtle_2]
switch_pin: ^Turtle_2:HUB
afc_bowden_length: 1641.91
move_dis: 70
hub_clear_move_dis: 65

[AFC_led AFC_Indicator_2]
pin: Turtle_2:RGB1
chain_count: 4
color_order: GRBW

[AFC_buffer Turtle_2]
advance_pin: ^Turtle_2:TN_ADV
trailing_pin: ^Turtle_2:TN_TRL
multiplier_high: 1.05
multiplier_low: 0.95
```