#!/bin/bash
mkdir -p /build
cd /build

# Building Dependencies
# dpkg --configure -a # Maybe i need this?
apt update
apt install -y git wget build-essential libpcre3 libpcre3-dev libssl-dev

# Get nginx source code
wget http://nginx.org/download/nginx-1.14.0.tar.gz -O nginx.tar.gz
tar -xvzf nginx.tar.gz
rm nginx.tar.gz
mv nginx-* nginx-source

# Get nginx modules source code
git clone https://github.com/arut/nginx-rtmp-module
git clone https://github.com/kaltura/nginx-vod-module
git clone https://github.com/vozlt/nginx-module-vts 

cd nginx-source

# Configure pre-build
./configure \
    --add-module=../nginx-rtmp-module \
    --add-module=../nginx-vod-module \
    --add-module=../nginx-module-vts \
    --with-file-aio \
    --with-threads \
    --with-cc-opt='-O3' \
    --with-http_ssl_module \
    --prefix=/usr/local/nginx \
    --with-http_stub_status_module 

# Build
make
make install

# Move Binary to a folder on $PATH
mv /usr/local/nginx/sbin/nginx /usr/bin/