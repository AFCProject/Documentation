## ACE Pro 1/2 Related Commands

These commands are used to manage ACE Pro 1 and ACE Pro 2 units through the `AFC_ACE` unit driver (status, RFID,
material/temperature info, drying, feed assist, and stuck spool detection). All commands are defined on the ACE
Pro 1 (`AFC_ACE`) driver and are inherited unchanged by the ACE Pro 2 (`AFC_ACE2`) driver, so they work the same
way on both units.

### Status & Diagnostics

-----
[AFC_ACE_STATUS]
::: AFC_ACE.afcACE.cmd_AFC_ACE_STATUS
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_FEED_INFO]
::: AFC_ACE.afcACE.cmd_AFC_ACE_FEED_INFO
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_SENSOR_STATE]
::: AFC_ACE.afcACE.cmd_AFC_ACE_SENSOR_STATE
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_BUFFER_STATE]
::: AFC_ACE.afcACE.cmd_AFC_ACE_BUFFER_STATE
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_TEMP_INFO]
::: AFC_ACE.afcACE.cmd_AFC_ACE_TEMP_INFO
    options:
      docstring_style: numpy
      heading_level: 4

### Calibration & Testing

-----
[AFC_ACE_CALIBRATE]
::: AFC_ACE.afcACE.cmd_AFC_ACE_CALIBRATE
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_CALIBRATE_HUB]
::: AFC_ACE.afcACE.cmd_AFC_ACE_CALIBRATE_HUB
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_FEED_TEST]
::: AFC_ACE.afcACE.cmd_AFC_ACE_FEED_TEST
    options:
      docstring_style: numpy
      heading_level: 4

### Material

-----
[AFC_ACE_MATERIAL_INFO]
::: AFC_ACE.afcACE.cmd_AFC_ACE_MATERIAL_INFO
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_SET_MATERIAL]
::: AFC_ACE.afcACE.cmd_AFC_ACE_SET_MATERIAL
    options:
      docstring_style: numpy
      heading_level: 4

### Drying

-----
[AFC_ACE_DRY]
::: AFC_ACE.afcACE.cmd_AFC_ACE_DRY
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_DRY_STOP]
::: AFC_ACE.afcACE.cmd_AFC_ACE_DRY_STOP
    options:
      docstring_style: numpy
      heading_level: 4

### Feed Assist & Stuck Spool Detection

-----
[AFC_ACE_FEED_ASSIST]
::: AFC_ACE.afcACE.cmd_AFC_ACE_FEED_ASSIST
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_STUCK_SPOOL_DETECTION]
::: AFC_ACE.afcACE.cmd_AFC_ACE_STUCK_SPOOL_DETECTION
    options:
      docstring_style: numpy
      heading_level: 4

<!--
RFID commands hidden until RFID support is added to AFC.

### RFID

-----
[AFC_ACE_RFID_DUMP]
::: AFC_ACE.afcACE.cmd_AFC_ACE_RFID_DUMP
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_RFID_RESCAN]
::: AFC_ACE.afcACE.cmd_AFC_ACE_RFID_RESCAN
    options:
      docstring_style: numpy
      heading_level: 4
-->

### Miscellaneous

-----
[AFC_ACE_FAN]
::: AFC_ACE.afcACE.cmd_AFC_ACE_FAN
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_LANE_RESET]
::: AFC_ACE.afcACE.cmd_AFC_ACE_LANE_RESET
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_ACE_CMD]
::: AFC_ACE.afcACE.cmd_AFC_ACE_CMD
    options:
      docstring_style: numpy
      heading_level: 4
