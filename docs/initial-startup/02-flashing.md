=== "BoxTurtle"

    ## Flashing the AFC-Lite board

    The AFC-Lite MCU can be connected with either CAN bus or USB.

    If you choose to use CAN bus,
    follow [this guide from Esoterical](https://canbus.esoterical.online/toolhead_flashing/common_hardware/AFC-Lite/README.html).
    This site also has a wealth of information on how to configure CAN bus if this is your first time using it.

    If you choose to use USB, you will still need to run a 24 V+/V- cable to the AFC-Lite CAN bus port, just leave the CAN
    High/Low pins unpopulated. To flash the AFC-Lite for use with USB for data,
    follow [this guide from Esoterical](https://usb.esoterical.online/hardware_config/STM32/AFC_Lite.html).

    Further details regarding the AFC-Lite can be
    found [in the AFC-Lite manual](https://github.com/xbst/AFC-Lite/blob/master/Docs/AFC-Lite_Manual.pdf).

    After flashing and setting up connections/configurations appropriately, you should be able to either obtain the CAN bus
    UUID (if using CAN) or the device serial path (e.g., `/dev/serial/by-id/...`) (if using USB) for the AFC-Lite MCU.
    Please ensure you have these values before you proceed, as they will be required.

    --8<-- "includes/toolhead_pins.md"

=== "Other Systems"

    Please follow you MCU guide for the board that you are using in your system.

    --8<-- "includes/toolhead_pins.md"

=== "Snapmaker U1"
    Skip for Snapmaker since there is nothing to flash, installation instructions are on [Plugin Install](03-install-plugin.md) page