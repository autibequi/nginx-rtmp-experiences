# nginx-rtmp-experiences
A bunch of very bad experiences with nginx rtmp

## Docker

To save some time you can run nginx-rtmp directly using a docker container defined in this projecet.

To execute simple run `docker-compose up`.

Otherwise you can compile you own nginx with the rtmp module.

## Installing nginx-rtmp-module

### Compiling

nginx-rtmp-module is (as the name says) a module. Therefore you have to build a nginx with this plugin integrated.

To build a nginx with rtmp plugin follow the official nginx-rtmp compiling guide:

https://github.com/arut/nginx-rtmp-module/wiki/Getting-started-with-nginx-rtmp

After building a nginx executable will be placed at `/usr/local/nginx/sbin/nginx` to simplify workflow move or create a symbolic link to your `bin` folder. You can also add `/usr/local/nginx/sbin` to your `$PATH` variable.

### Setting up nginx.conf

To install the configuration file from this project simple run `ln -s $(pwd)/nginx.conf /usr/local/nginx/conf/`.

### Stating up

To start nginx execute `sudo nginx`.

If nginx is already running execute `sudo nginx -s reload` to load the configuration.

## Creating a stream

To make a live stream publish a file to the open `rtmp` address. The file will be ready to stream on the specified path.

```
ffmpeg -re -i /var/Videos/test.mp4 -c copy -f flv rtmp://localhost/myapp/mystream
```

## Serving Videos On Demand (VODs)

### HTTP vs RTMP

nginx-rtmp can serve video by both protocols (http and rtmp). There are differences between the two protocols

## Demo Web Player

To test how to consume video with a webplayer there is also a test html with `video.js` web video player.

To load the test simple open the `player.html` file and add the url to the stream on the specified field.

Video.js supports `html5` and `flash` but to use `flash` you must add extra parameters

Why flash? You will need it to play `rmtp` protocols.

## Mouting a S3FS

This project use `goofys` to mount a virtual s3 fs on linux. 

To install follow instruction on github: https://github.com/kahing/goofys

To mount a s3file system run `goofys <bucket> <folder>`. The folder must be empty to mount on it.

To enable nginx to access the mounted s3fs you must define the same user on nginx.conf with `user <USERNAME>;` tag.

If you try to access via `http` nginx will download the whole file before sending it to the user (i think).

Using RTMP the stream will start right away.

## Creatins HLS
ffmpeg -i sample.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls sample.m3u8