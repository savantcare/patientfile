#!/bin/bash

# Step1: Making sure OS version is correct
if [[ $(lsb_release -rs) == "20.04" ]]; then 
    echo "Compatible version"
else
    echo "Non-compatible version"
    exit
fi

apt update
apt upgrade

# Step 2: Installing requrired packages
apt install -y emacs fish tmux


# Step 3: Using ansible to secure the server
apt install -y ansible


# Step 4: Writing the script run date to gt-releases
echo "$(date)" > /etc/gt-releases
