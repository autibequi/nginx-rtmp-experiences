#!/bin/bash

# Move nginx binary to $PATH
rm /usr/local/nginx/conf/nginx.conf
ln -s /stream/nginx.conf /usr/local/nginx/conf/nginx.conf

# Install PIP
apt update
apt install -y python-pip

# Install AWSCLI
pip install awscli

# Install Goofys
wget bit.ly/goofys-latest -O /usr/bin/goofys
chmod +x /usr/bin/goofys