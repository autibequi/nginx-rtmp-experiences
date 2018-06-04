FROM ubuntu:17.10
COPY . /stream
WORKDIR /stream

# Setup
RUN ./build_nginx.sh
RUN ./setup_env.sh
RUN ./setup_env.sh

ENTRYPOINT supervisord -c supervisor.conf