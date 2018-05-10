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

RELEASE_DIR=${TRAVIS_BUILD_DIR}/releases

mkdir -p "${RELEASE_DIR}"

go get github.com/elazarl/go-bindata-assetfs
go get github.com/jteeuwen/go-bindata/go-bindata


ls -l "$GOPATH/bin"

# Disable warnings as fatal for npm
unset CI
echo "generating assets"
go generate ./...

echo "build zip of assets"

cd $PROJECT_DIR/build
zip -9 -r -D ${RELEASE_DIR}/dist.zip .
cd $PROJECT_DIR


echo "building bin into ${RELEASE_DIR}"


for GOARCH in amd64
do
	for GOOS in darwin linux windows
	do
		BINFN="fresco"

		if [ "$GOOS" == "windows" ]; then
			BINFN="${BINFN}.exe"
		fi

		GOOS=${GOOS} GOARCH=${GOARCH} go build -ldflags "${LDFLAGS}" -o "${RELEASE_DIR}/${BINFN}"  cmd/viewer/*.go

		cdir=$(pwd)
		cd $RELEASE_DIR

		chmod a+x ${BINFN}
		fn="fresco_${GOOS}"
		zip -9 -D ${fn}.zip ${BINFN}
		rm ${BINFN}
		cd ${cdir}
	done
done
cd $OLDDIR

