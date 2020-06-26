#!/bin/bash

if [[ $(lsb_release -rs) == "20.04" ]]; then 
    echo "Compatible version"
else
    echo "Non-compatible version"
    exit
fi

apt update
apt upgrade

apt install -y emacs fish tmux


echo "Script run on $(date)" > /etc/gt_releases
