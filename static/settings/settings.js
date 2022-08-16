
const { ipcRenderer } = require('electron');

const state = Vue.reactive({
    base: {
        overlaySpells: false,
        debugPerformance: false,
    },
    scripts: []
});

// ----- Settings -----
ipcRenderer.on('dataSettings', function (evt, message) {
    const data = JSON.parse(message);
    state.scripts = data;
});
ipcRenderer.send('requestSettings');


const app = Vue.createApp({
    data() { return state; },
    methods: {
        updateBaseSettings() {
            ipcRenderer.send('updateBaseSettings', JSON.stringify(state.base));
        },
        updateSettings() {
            ipcRenderer.send('updateSettings', JSON.stringify(state.scripts));
        },
        closeWindow() {
            ipcRenderer.send('closeSettingsWindow');
        },
        reloadWindows() {
            ipcRenderer.send('reloadWindows');
        },
        openOverlayDevTools() {
            ipcRenderer.send('openOverlayDevTools');
        },
        reloadScripts() {
            ipcRenderer.send('reloadScripts');
        },
        reloadMe() {
            location.reload();
        }
    }
});

app.mount('#app')