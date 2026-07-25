The following shows a complete real-world example of an IDEX (Independent Dual Extruder) setup
using two BoxTurtle units: `Turtle_1` feeds the left toolhead (`extruder`) through its own hub,
and `Turtle_2` feeds the right toolhead (`extruder1`) through its own hub. Each toolhead is
parked/selected independently by the printer's IDEX carriage macros rather than klipper-toolchanger.

!!! note
    `[AFC_Toolchanger Tools]` is still required since AFC uses it internally to track toolheads,
    but the klipper-toolchanger plugin itself is not required here. Because `custom_tool_swap`
    and `custom_unselect` are set on each `[AFC_extruder]`, AFC calls the printer's own IDEX
    activation/parking macros instead of the default `SELECT_TOOL`/`UNSELECT_TOOL` calls that
    would otherwise require klipper-toolchanger to be installed. There is no `tool:` option on
    either extruder for this reason, unlike the HTLF/BoxTurtle klipper-toolchanger examples above.

**Directory structure:**

```text
~/printer_data/config/AFC
├── AFC.cfg
├── AFC_Hardware.cfg          # AFC_extruder sections for both toolheads
├── AFC_Toolchanger.cfg       # AFC_Toolchanger unit
├── AFC_Turtle_1.cfg          # BoxTurtle unit, hub-mode lanes, hub, buffer -> left toolhead
├── AFC_Turtle_2.cfg          # BoxTurtle unit, hub-mode lanes, hub, buffer -> right toolhead
└── mcu/
    ├── Longboi.cfg
    └── AFC_Turtle_2_mcu.cfg
```

**`AFC_Toolchanger.cfg`: unit registration:**

```ini
[AFC_Toolchanger Tools]
```

**`AFC_Hardware.cfg`: both extruders with `custom_tool_swap`/`custom_unselect`:**

Each extruder points at the macro that activates its side of the IDEX gantry, and at the macro
that parks it again, instead of relying on klipper-toolchanger's `SELECT_TOOL`/`UNSELECT_TOOL`.

```ini
# Left toolhead: fed by Turtle_1
[AFC_extruder extruder]
pin_tool_start: buffer
tool_stn: 72
tool_stn_unload: 80
tool_sensor_after_extruder: 0
tool_unload_speed: 25
tool_load_speed: 25
toolchanger_unit: Tools
custom_tool_swap: TOOL_0
custom_unselect: TOOL_1

# Right toolhead: fed by Turtle_2
[AFC_extruder extruder1]
pin_tool_start: buffer
tool_stn: 72
tool_stn_unload: 80
tool_sensor_after_extruder: 0
tool_unload_speed: 25
tool_load_speed: 25
toolchanger_unit: Tools
custom_tool_swap: TOOL_1
custom_unselect: TOOL_0
```

!!! note
    `TOOL_0` and `TOOL_1` are the printer's own IDEX gantry macros that activate/park each carriage
    (for example, macros built around Klipper's `dual_carriage` support). These are not provided by
    AFC or klipper-toolchanger, you define them elsewhere in your printer configuration to match your
    IDEX hardware.

**`AFC_Turtle_1.cfg`: BoxTurtle unit with four hub-mode lanes feeding the left toolhead:**

```ini
[AFC_BoxTurtle Turtle_1]
hub: Turtle_1
extruder: extruder
enable_assist: True
enable_kick_start: True
buffer: Turtle_1

[AFC_stepper lane1]
unit: Turtle_1:1
step_pin: Turtle_1:M1_STEP
dir_pin: !Turtle_1:M1_DIR
enable_pin: !Turtle_1:M1_EN
rotation_distance: 7.16
dist_hub: 147.55
led_index: Turtle_1_Indicator:10-16
afc_motor_rwd: Turtle_1:MOT1_FWD
afc_motor_fwd: Turtle_1:MOT1_RWD
afc_motor_enb: Turtle_1:MOT1_EN
prep: ^!Turtle_1:TRG1
load: ^Turtle_1:EXT1

[tmc2209 AFC_stepper lane1]
uart_pin: Turtle_1:M1_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane2]
unit: Turtle_1:2
step_pin: Turtle_1:M2_STEP
dir_pin: Turtle_1:M2_DIR
enable_pin: !Turtle_1:M2_EN
rotation_distance: 7.16
dist_hub: 92.48
led_index: Turtle_1_Indicator:1-7
afc_motor_rwd: Turtle_1:MOT2_RWD
afc_motor_fwd: Turtle_1:MOT2_FWD
afc_motor_enb: Turtle_1:MOT2_EN
prep: ^!Turtle_1:TRG2
load: ^Turtle_1:EXT2

[tmc2209 AFC_stepper lane2]
uart_pin: Turtle_1:M2_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane3]
unit: Turtle_1:3
step_pin: Turtle_1:M3_STEP
dir_pin: !Turtle_1:M3_DIR
enable_pin: !Turtle_1:M3_EN
rotation_distance: 7.16
dist_hub: 98.25
led_index: Turtle_1_Indicator:17-23
afc_motor_rwd: Turtle_1:MOT3_RWD
afc_motor_fwd: Turtle_1:MOT3_FWD
afc_motor_enb: Turtle_1:MOT3_EN
prep: ^!Turtle_1:TRG3
load: ^Turtle_1:EXT3

[tmc2209 AFC_stepper lane3]
uart_pin: Turtle_1:M3_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane4]
unit: Turtle_1:4
step_pin: Turtle_1:M4_STEP
dir_pin: Turtle_1:M4_DIR
enable_pin: !Turtle_1:M4_EN
rotation_distance: 7.16
dist_hub: 156.33
led_index: Turtle_1_Indicator:26-32
afc_motor_rwd: Turtle_1:MOT4_RWD
afc_motor_fwd: Turtle_1:MOT4_FWD
afc_motor_enb: Turtle_1:MOT4_EN
prep: ^!Turtle_1:TRG4
load: ^Turtle_1:EXT4

[tmc2209 AFC_stepper lane4]
uart_pin: Turtle_1:M4_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_hub Turtle_1]
switch_pin: ^Turtle_1:HUB
afc_bowden_length: 869.72
move_dis: 75
hub_clear_move_dis: 65

[AFC_led Turtle_1_Indicator]
pin: Turtle_1:RGB4
chain_count: 32
color_order: GRB

[AFC_buffer Turtle_1]
advance_pin: ^Turtle_1:TN_ADV
trailing_pin: ^Turtle_1:TN_TRL
multiplier_high: 1.05
multiplier_low: 0.95
```

**`AFC_Turtle_2.cfg`: BoxTurtle unit with four hub-mode lanes feeding the right toolhead:**

```ini
[AFC_BoxTurtle Turtle_2]
hub: Turtle_2
extruder: extruder1
enable_assist: True
enable_kick_start: True
buffer: Turtle_2

[AFC_stepper lane5]
unit: Turtle_2:1
step_pin: Turtle_2:M1_STEP
dir_pin: !Turtle_2:M1_DIR
enable_pin: !Turtle_2:M1_EN
rotation_distance: 7.16
dist_hub: 153.24
led_index: Turtle_2_Indicator:10-16
afc_motor_rwd: Turtle_2:MOT1_FWD
afc_motor_fwd: Turtle_2:MOT1_RWD
afc_motor_enb: Turtle_2:MOT1_EN
prep: ^!Turtle_2:TRG1
load: ^Turtle_2:EXT1

[tmc2209 AFC_stepper lane5]
uart_pin: Turtle_2:M1_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane6]
unit: Turtle_2:2
step_pin: Turtle_2:M2_STEP
dir_pin: Turtle_2:M2_DIR
enable_pin: !Turtle_2:M2_EN
rotation_distance: 7.16
dist_hub: 37.77
led_index: Turtle_2_Indicator:1-7
afc_motor_rwd: Turtle_2:MOT2_FWD
afc_motor_fwd: Turtle_2:MOT2_RWD
afc_motor_enb: Turtle_2:MOT2_EN
prep: ^!Turtle_2:TRG2
load: ^Turtle_2:EXT2

[tmc2209 AFC_stepper lane6]
uart_pin: Turtle_2:M2_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane7]
unit: Turtle_2:3
step_pin: Turtle_2:M3_STEP
dir_pin: !Turtle_2:M3_DIR
enable_pin: !Turtle_2:M3_EN
rotation_distance: 7.16
dist_hub: 41.19
led_index: Turtle_2_Indicator:17-23
afc_motor_rwd: Turtle_2:MOT3_FWD
afc_motor_fwd: Turtle_2:MOT3_RWD
afc_motor_enb: Turtle_2:MOT3_EN
prep: ^!Turtle_2:TRG3
load: ^Turtle_2:EXT3

[tmc2209 AFC_stepper lane7]
uart_pin: Turtle_2:M3_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_stepper lane8]
unit: Turtle_2:4
step_pin: Turtle_2:M4_STEP
dir_pin: Turtle_2:M4_DIR
enable_pin: !Turtle_2:M4_EN
rotation_distance: 7.16
dist_hub: 83.81
led_index: Turtle_2_Indicator:26-32
afc_motor_rwd: Turtle_2:MOT4_FWD
afc_motor_fwd: Turtle_2:MOT4_RWD
afc_motor_enb: Turtle_2:MOT4_EN
prep: ^!Turtle_2:TRG4
load: ^Turtle_2:EXT4

[tmc2209 AFC_stepper lane8]
uart_pin: Turtle_2:M4_UART
run_current: 0.8
sense_resistor: 0.110

[AFC_hub Turtle_2]
switch_pin: ^Turtle_2:HUB
afc_bowden_length: 1402.87
move_dis: 75

[AFC_led Turtle_2_Indicator]
pin: Turtle_2:RGB2
chain_count: 32
color_order: GRB

[AFC_buffer Turtle_2]
advance_pin: ^Turtle_2:TN_ADV
trailing_pin: ^Turtle_2:TN_TRL
multiplier_high: 1.05
multiplier_low: 0.95
```
