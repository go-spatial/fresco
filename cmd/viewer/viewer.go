//go:generate sh -c "cd ../..; npm run build"
//go:generate sh -c "cd ../../; go-bindata -nomemcopy -pkg=main -o=cmd/viewer/bindata.go -ignore=.DS_Store build/..."

package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"os/exec"
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
	log.Printf("Opening browser via : %v %v", cmd, strings.Join(args, " "))
	return exec.Command(cmd, args...).Run()
}

func getUrl(address string) string {
	if strings.Index(address, ":") == 0 {
		return "http://localhost" + address
	}
	return "http://" + address
}

func main() {
	flag.Parse()
	http.Handle("/", http.FileServer(AssetFileSystem()))
	log.Printf("Starting Viewer (%v) at %v", Version, *bindAddress)
	log.Println("ctrl-c to exit.")
	ctx, cancel := context.WithCancel(context.Background())
	go func(ctx context.Context) {
		select {
		case <-time.After(200 * time.Millisecond):
			// noopt
		case <-ctx.Done():
			return
		}

		err := open(getUrl(*bindAddress))
		if err != nil {
			log.Println(err)
		}
	}(ctx)
	if err := http.ListenAndServe(*bindAddress, nil); err != nil {
		cancel()
		log.Println("Got Error:", err)
	}
	<-time.After(1 * time.Minute)
	os.Exit(1)
}
