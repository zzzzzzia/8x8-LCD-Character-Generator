/* app.js */

    document.addEventListener('DOMContentLoaded', () => {
    const boxChar = document.querySelector('.box-char');
    document.getElementById('clear').addEventListener('click', () => {
        document.querySelectorAll('.dot-px').forEach(dot => {
            dot.classList.remove('active');
        });
        generateCode();
    });

    document.getElementById('invert').addEventListener('click', () => {
        document.querySelectorAll('.dot-px').forEach(dot => {
            dot.classList.toggle('active');
        });
        generateCode();
    });
    
    // Adding Click Event Handlers to LED Board Containers
    document.querySelector('.box-char').addEventListener('click', (event) => {
        const target = event.target;
        // Checks if the target of the click event is a small cube
        if (target.classList.contains('dot-px')) {
            // Toggle the state of the cube
            target.classList.toggle('active');
            generateCode();
        }
    });

    /*const colorRadios = document.querySelectorAll('input[name="color"]');
    const activeLed = document.querySelector('.dot-px.active');
    // 设置初始 LED active 状态为绿色
    activeLed.style.backgroundColor = 'green';

    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'green') {
                activeLed.style.backgroundColor = 'green';
            } else if (this.value === 'blue') {
                activeLed.style.backgroundColor = 'blue';
            }
        });
    }); */

    document.addEventListener('DOMContentLoaded', function() {
    // 当页面加载完成时执行的代码
    const radioButtons = document.querySelectorAll('input[name="datatype"]');
        
    // 添加 change 事件监听器到每个 radio 按钮
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            generateCode(); // 当任一 radio 按钮被改变时调用 updateCodeBox()
        });
    });
        
        // 初始加载页面时也要调用一次 updateCodeBox()，确保初始状态正确显示
    generateCode();
    });


    function generateCode() {
        const binaryArray = [];
        for (let x = 0; x < 8; x++) {
            let binaryStr = '';
            for (let y = 0; y < 8; y++) {
                const dot = document.querySelector(`.dot-px[data-x="${x}"][data-y="${y}"]`);
                binaryStr += dot.classList.contains('active') ? '1' : '0';
            }
            binaryArray.push(binaryStr);
        }
        updateCodeBox(binaryArray);
    }

    function updateCodeBox(binaryArray) {
        const dataType = document.querySelector('input[name="datatype"]:checked').value;
        let code = '';
        if (dataType === 'bin') {
            code = generateBinCode(binaryArray);
        } else if (dataType === 'hex') {
            code = generateHexCode(binaryArray);
        }
        const codeBox = document.getElementById('code-box');
        codeBox.textContent = code;
    }
    
    function generateBinCode(binaryArray) {
        return `const uint8_t customChar[] PROGMEM = {\n` + 
        binaryArray.map(binaryStr => `    0b${binaryStr}`).join(',\n') +`\n};\n\n`;
    }
    
    function generateHexCode(binaryArray) {
        return `const uint8_t customChar[] PROGMEM = {\n` +
        binaryArray.map(binaryStr => `    0x${parseInt(binaryStr, 2).toString(16)}`).join(',\n') +`\n};\n\n`;
    }
    });
