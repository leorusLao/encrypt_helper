let export_license = document.getElementById('export_license')
let import_license = document.getElementById('import_license')

export_license.addEventListener('click', async ()=>{
    const print = await window.electronAPI.getFingerprint()
    console.log(print)
    if (print == "") {
        alert("请插入加密设备")
        return
    }
    window.electronAPI.saveFile(print)
})

import_license.addEventListener('click', async ()=>{
    const ok = await window.electronAPI.updateFingerprint()
    if (!ok) {
        alert("导入失败，请确认授权文件是否有误")
        return
    }
})
