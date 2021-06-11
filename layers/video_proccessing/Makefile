build-VideoProccessingLayer:
	wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
	wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz.md5
	md5sum -c ffmpeg-release-amd64-static.tar.xz.md5
	tar xvf ffmpeg-release-amd64-static.tar.xz

	mkdir -p "$(ARTIFACTS_DIR)/bin"
	cp ffmpeg-4.4-amd64-static/ffmpeg "$(ARTIFACTS_DIR)/bin/ffmpeg"
