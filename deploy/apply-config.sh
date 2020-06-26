#!/bin/bash
ansible-playbook configure-package-manager.yml
ansible-playbook configure-ssh-secure.yml
ansible-playbook configure-firewall.yml
ansible-playbook configure-docker.yml