const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const appVersion = require('./package.json').version;
const os = require('os').platform();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {

	// Create the browser window.
	win = new BrowserWindow({
		width: process.env.ENV === 'development' ? 1200 : 450,
		height: 800,
		icon: path.join(__dirname, '/images/logo_640.png')
	})

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})

	// Create the Application's main menu
	var template = [{
			label: "Application",
			submenu: [
					{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
					{ type: "separator" },
					{ label: "Quit", accelerator: "Command+Q", click: function() { app.quit() }}
			]}, {
			label: "Edit",
			submenu: [
					{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
					{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
					{ type: "separator" },
					{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
					{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
					{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
					{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
			]}
	]

	// Don't set menu items in development
	if ( process.env.ENV !== 'development' ) {
		Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	}

	// Open the DevTools - Only for development env
	if ( process.env.ENV === 'development' ) {
		win.webContents.openDevTools()
	}

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if ( process.platform !== 'darwin' ) {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if ( win === null ) {
		createWindow()
	}
})
