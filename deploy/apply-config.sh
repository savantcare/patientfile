#!/bin/bash
ansible-playbook package-manager.yml
ansible-playbook ssh-secure.yml
ansible-playbook firewall-secure.yml