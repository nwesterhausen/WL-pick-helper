import { Route, Routes } from '@solidjs/router';
import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import MenuBar from './components/MenuBar';
import AboutPage from './pages/About';
import EspnUtil from './pages/EspnUtil';

function App() {
  const [greetMsg, setGreetMsg] = createSignal('');
  const [name, setName] = createSignal('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name: name() }));
  }

  return (
    <>
      <MenuBar />
      <Routes>
        <Route path='/about' component={AboutPage} />
        <Route path='/espn-util' component={EspnUtil} />
      </Routes>
    </>
  );
}

export default App;
