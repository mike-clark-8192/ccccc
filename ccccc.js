
(async function() {
    const [fileHandle] = await window.showOpenFilePicker({
        types: [{
            description: 'JavaScript files',
            accept: {'text/javascript': ['.js']}
        }]
    });

    const file = await fileHandle.getFile();
    const contents = await file.text();

    console.log('Loaded:', file.name, contents.length, 'chars');

    // Blob URL
    const blob = new Blob([contents], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
        URL.revokeObjectURL(url);
        console.log('✓ Loaded via blob URL');
    };
    script.onerror = () => {
        URL.revokeObjectURL(url);
        console.error('✗ Blob URL failed');
    };
    document.head.appendChild(script);
})();
