FROM lambci/lambda:build-python3.8

COPY ./src/requirements.txt /var/task/requirements.txt
RUN pip3 install -r requirements.txt

ENTRYPOINT ["/var/rapid/init", "--bootstrap", "/var/runtime/bootstrap", "--enable-msg-logs"]
