document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('confirmModal');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    const warningModal = document.getElementById('warningModal');
    const warningOk = document.getElementById('warningOk');

    function collectFormData() {
        const data = {};
        data.fname = document.getElementById('fname')?.value || '';
        data.mname = document.getElementById('mname')?.value || '';
        data.lname = document.getElementById('lname')?.value || '';
        data.bday = document.getElementById('bday')?.value || '';
        data.birthplace = document.getElementById('birthplace')?.value || '';
        data.sex = document.querySelector('input[name="sex"]:checked')?.nextElementSibling?.textContent || '';
        data.civilstatus = document.getElementById('civilstatus')?.value || '';
        data.nationality = document.getElementById('nationality')?.value || '';
        data.religion = document.getElementById('religion')?.value || '';
        data.contactnumber = document.getElementById('contactnumber')?.value || '';
        data.email = document.getElementById('email')?.value || '';
        data.homeaddress = document.getElementById('homeaddress')?.value || '';
        data['e-name'] = document.getElementById('e-name')?.value || '';
        data['e-relation'] = document.getElementById('e-relation')?.value || '';
        data['e-contactnumber'] = document.getElementById('e-contactnumber')?.value || '';
        data.username = document.getElementById('username')?.value || '';
        // Passwords are not included for security
        return data;
    }

    function getImageDataUrl(callback) {
        const fileInput = document.getElementById('imageUpload');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                callback(e.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            callback('');
        }
    }

    function allFieldsFilled() {
        const requiredIds = [
            'fname', 'mname', 'lname', 'bday', 'birthplace', 'sex',
            'civilstatus', 'nationality', 'religion', 'contactnumber',
            'email', 'homeaddress', 'e-name', 'e-relation', 'e-contactnumber',
            'username', 'password', 'confirm-password'
        ];
        for (const id of requiredIds) {
            if (id === 'sex') {
                if (!document.querySelector('input[name="sex"]:checked')) return false;
            } else if (id === 'civilstatus') {
                if (!document.getElementById('civilstatus').value) return false;
            } else {
                const el = document.getElementById(id);
                if (!el || !el.value.trim()) return false;
            }
        }
        // Check image file
        const img = document.getElementById('imageUpload');
        if (!img || !img.files || img.files.length === 0) return false;
        return true;
    }

    function hideAllModals() {
        modal.classList.remove('show');
        warningModal.classList.remove('show');
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllModals();
        if (!allFieldsFilled()) {
            warningModal.classList.add('show');
        } else {
            modal.classList.add('show');
        }
    });

    // Allow pressing Enter to trigger submit button
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitBtn.click();
        }
    });

    warningOk.addEventListener('click', function() {
        warningModal.classList.remove('show');
    });

    confirmNo.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    confirmYes.addEventListener('click', function() {
        getImageDataUrl(function(imageDataUrl) {
            const data = collectFormData();
            if (imageDataUrl) data.imageDataUrl = imageDataUrl;
            localStorage.setItem('formData', JSON.stringify(data));
            window.location.href = "output.html";
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    warningModal.addEventListener('click', function(e) {
        if (e.target === warningModal) {
            warningModal.classList.remove('show');
        }
    });
});