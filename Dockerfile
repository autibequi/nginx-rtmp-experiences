FROM ubuntu:17.10

COPY . /stream

RUN ./stream/build_nginx.sh

