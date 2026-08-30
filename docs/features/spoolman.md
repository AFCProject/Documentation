# Spoolman

AFC has the ability to integrate with Spoolman. This is as simple as ensuring that the following information is present
in your `moonraker.conf` file:

```ini
[spoolman]
server: http://<ip>:<port>
sync_rate: 5
```

For example:

```ini
[spoolman]
server: http://192.168.1.184:7912
sync_rate: 5
```

!!!note "Spoolman Weight Check"

    When assigning a spoolID from Spoolman, either via a UI like Mainsail or Fluidd, or via a macro like `SET_SPOOL_ID`,
    AFC will perform a check to ensure that the weight of the requested spool is not 0, null, or a negative value. If it
    is, AFC will reject the spool assignment and log an error message identifying the error. For advanced use cases,
    this can be disabled by setting `disable_weight_check: True` in your `[AFC]` section of your configuration file.

