//go:generate sh -c "cd ../..; npm run build"
//go:generate sh -c "cd ../../; go-bindata -nomemcopy -pkg=main -o=cmd/viewer/bindata.go -ignore=.DS_Store build/..."

package main

import (
	"flag"
	"net/http"
	"os/exec"
	"log"
	"runtime"
	"strings"
	"time"
)


var Version = "version_not_set"
var bindAddress = flag.String("address", ":9000", "The network addresss with port to bind to.")

// ref: https://stackoverflow.com/questions/39320371/how-start-web-server-to-open-page-in-browser-in-golang
func open(url string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default:
		cmd = "xdg-open"
	}
	args = append(args, url)
	log.Printf("Opening browser to %v",args)
	return exec.Command(cmd, args...).Run()
}

func getUrl(address string) string {
	if strings.Index(address,":") == 0 {
		return "http://localhost"+address
	}
		return "http://"+address
}

func main() {
	flag.Parse()
	http.Handle("/", http.FileServer(AssetFileSystem()))
	log.Printf("Starting Viewer (%v) up on %v",Version, *bindAddress)
	go func(){
		<-time.After(200 * time.Millisecond)
		err := open(getUrl(*bindAddress))
		if err != nil {
			log.Println(err)
		}
	}()
	panic(http.ListenAndServe(*bindAddress, nil))
}
