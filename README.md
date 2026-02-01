# Bedtime

**Bedtime** is a simple GNOME Shell extension that adds a top-bar menu for scheduling automatic system shutdowns

<img width="480" height="270" alt="Screenshot from 2026-02-01 18-36-17" src="https://github.com/user-attachments/assets/6f2df67e-81f4-468d-bf31-b5e330f3d80c" />

## Installation

1. Clone the repository:
```
git clone https://github.com/mirqko/bedtime_gnome_extension.git
```
2. Copy the extension directory to GNOME’s local extensions folder:
```
mkdir -p ~/.local/share/gnome-shell/extensions
cp -r bedtime@mirqko.github.com ~/.local/share/gnome-shell/extensions/
```
3. Check that GNOME recognizes it:
```
gnome-extensions list
```
4. enable it
```
gnome-extensions enable bedtime@mirqko.github.com
```
## Disable shutdown password prompt (optional)

By default, the shutdown command requires a sudo authentication.
If you want the extension to shut down the system without prompting for a password, you can allow this explicitly via sudoers.


1. Open the sudoers file:
```
sudo visudo
```
2. Add the following line at the end of the file (replace <yourusername> with your actual username):
```
<yourusername> ALL=(ALL) NOPASSWD: /sbin/shutdown
```
Save and exit. The change takes effect immediately.


## Tested on:
tested on Pop!_OS 22.04 with gnome-shell 42.9 
