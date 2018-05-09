#!/bin/bash -x

set -e

################################################################################
# This script will build the necessary binaries for the fresco viewer.         #
################################################################################

OLDIR=$(pwd)
VERSION_TAG=$TRAVIS_TAG
if [ -z ${PROJECT_DIR+x} ]; then 
	PROJECT_DIR=`dirname $0`/..
fi

cd $PROJECT_DIR

# Let's make it absolute
PROJECT_DIR=$(pwd)


if [ -z "$VERSION_TAG" ]; then
	VERSION_TAG=$(git rev-parse --short HEAD)
fi

LDFLAGS="-w -X main.Version=${VERSION_TAG}"
export CGO_ENABLED=0

if [ -z "$TRAVIS_BUILD_DIR" ]; then
	TRAVIS_BUILD_DIR=$PROJECT_DIR
fi

mkdir -p "${TRAVIS_BUILD_DIR}/releases"

go get github.com/elazarl/go-bindata-assetfs
go get github.com/jteeuwen/go-bindata/go-bindata


ls -l "$GOPATH/bin"

# Disable warnings as fatal for npm
unset CI
echo "generating assets"
go generate ./...

echo "build zip of assets"

cd $PROJECT_DIR/build
zip -9 -r -D ${TRAVIS_BUILD_DIR}/releases/dist.zip .
cd $PROJECT_DIR


echo "building bin into ${TRAVIS_BUILD_DIR}"

for GOARCH in amd64
do
	for GOOS in darwin linux windows
	do
		FILENAME="${TRAVIS_BUILD_DIR}/releases/viewer_${GOOS}_${GOARCH}"

		GOOS=${GOOS} GOARCH=${GOARCH} go build -ldflags "${LDFLAGS}" -o ${FILENAME} cmd/viewer/*.go

		chmod a+x ${FILENAME}
		dir=$(dirname $FILENAME)
		fn=$(basename $FILENAME)
		cdir=$(pwd)
		cd $dir

		zip -9 -D ${fn}.zip ${fn}
		rm ${fn}
		cd ${cdir}
	done
done
cd $OLDDIR

