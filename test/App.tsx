import React, { useState } from 'react';
import { ToastContainer } from '../src/components/index';
import useToast from '../src/hooks/useToast';

function App() {
    const [open, setOpen] = useState(false);
    const toast = useToast();
    return (
        <div className="App">
            <ToastContainer></ToastContainer>
            <button onClick={() => toast.success('success')}>success</button>
            <button onClick={() => toast.info('info')}>info</button>
            <button onClick={() => toast.warning('warning')}>warning</button>
            <button onClick={() => toast.error('error')}>error</button>
        </div>
    );
}

export default App;
