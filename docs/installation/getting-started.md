# AFC-Klipper-Add-On Software Installation Guide

This Klipper plugin is for use with modern filament control systems such as BoxTurtle, NightOwl etc.

More information about BoxTurtle can be found [on the BoxTurtle project page](https://github.com/ArmoredTurtle/BoxTurtle).

!!! note

    All examples in this section assume that you are running the command on your SBC that the `AFC-Klipper-Add-On` software
    is installed on.


## Installation

### Step 1: Prerequisites

The `AFC-Klipper-Add-On` has the following pre-requisites:

- Klipper 12 or later
- Moonraker
- WebUI (Mainsail or Fluidd)
- Python3 >= 3.8
- git

!!!warning "SBC Hardware Recommendations"
    
    Your choice of SBC will impact your ability to complete multicolor prints. Users with SBCs such as a BTT CB1 and similar
    may find that they are unable to complete multicolor prints due to the limited resources available on these SBCs. We 
    recommend using a Raspberry Pi 4 or similar SBC with at least 2GB of RAM for the best experience.

The installer is written in Python and uses only the Python standard library, so no additional system packages (such as
`jq` or `crudini`) are required. `git` is needed to clone the repository and to keep it up to date. On a Debian based system
it can be installed with the following command:

```bash
sudo apt-get install git
```

The `install-afc.sh` and `update-afc.sh` scripts are small launchers that look for a Python 3.8 or newer interpreter and
hand over to the installer. They look in the following order and use the first one that works:

1. The directory given with the [`-y` option](runtime-options.md#-y-klipper-venv-dir)
2. The Klipper virtual environment (`~/klippy-env/bin/python`)
3. `python3`
4. `python`

!!! note

    The installer also checks that the Python in your Klipper virtual environment is 3.8 or newer before it shows
    any menus.

### Step 2: Software pre-configuration

The AFC-Klipper-Add-On software interfaces with Moonraker for many functions. To ensure complete compatibility, you should
ensure that the `moonraker.conf` file is configured correctly. Please ensure that the following is present in the `[authorization]`
section of your `moonraker.conf` file:

```ini

trusted_clients:
    127.0.0.0/8
```

Other entries may be present, and should remain, but please ensure that the `127.0.0.0/8` entry is present. This allows the
`AFC-Klipper-Add-On` software to communicate with Moonraker without requiring additional authentication.

### Step 3: Clone the git repository

The `AFC-Klipper-Add-On` software is available on GitHub. You can clone the repository with the following command:

=== "Command Line"
    ```bash
    cd ~
    git clone https://github.com/AFCProject/AFC-Klipper-Add-On.git
    cd AFC-Klipper-Add-On
    ```
=== "Explanation"

    Running these commands will clone the `AFC-Klipper-Add-On` repository to your home directory and change to the directory.

### Step 4: Start the installation process

From within the `AFC-Klipper-Add-On` directory, you can start the installation process with the following command:

```bash
./install-afc.sh
```

Running this script will start the installation process and walk you through a guided series of prompts to help you 
configure the software on your system.

### What happens at startup

Before the first menu is shown, the installer runs a series of checks. Each check prints a short status line as it runs.

| Check                          | What it does                                                                                                                                                                                    |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Not running as root            | The installer refuses to run as `root`. The one exception is K1 OS (such as Simple AF), where `root` is the normal user and the check is skipped. This exception does not apply to the Snapmaker U1.                                               |
| No conflicting software        | If Happy Hare is found in your Klipper `extras` directory, the installer stops. AFC is not compatible with Happy Hare, so remove it and re-run the script.                                     |
| Installation method            | If the `AFC-Klipper-Add-On` directory is not a git clone (for example it was downloaded as a ZIP file), you are warned that updates will need to be done manually and asked to press Enter.     |
| Python version                 | The Python in your Klipper virtual environment must be 3.8 or newer. Use the `-y` option if your virtual environment is not in `~/klippy-env/bin`.                                              |
| Repository is up to date       | For git installations, the installer switches to the configured branch and fetches updates. If new commits are found, they are pulled and the script restarts itself with the same options.     |
| Prior installation             | The installer looks for AFC files that are already linked into the Klipper `extras` directory, which determines whether the Install or Update option is offered.                                |

!!! note

    If the script restarts itself after pulling updates, this is expected. No action is needed.

### Runtime Options

If you need to configure your system for a non-standard installation, various run-time options are available. Further information
on these runtime options is available [in the runtime-options section.](runtime-options.md)
