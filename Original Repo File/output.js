document.addEventListener('DOMContentLoaded', function() {
    let data = null;
    try {
        data = JSON.parse(localStorage.getItem('formData') || '{}');
    } catch (e) {
        data = {};
    }

    function set(id, value) {
        document.getElementById(id).textContent = value || '';
    }

    set('out-fname', data.fname);
    set('out-mname', data.mname);
    set('out-lname', data.lname);
    set('out-bday', data.bday);
    set('out-birthplace', data.birthplace);
    set('out-sex', data.sex);
    set('out-civilstatus', data.civilstatus);
    set('out-nationality', data.nationality);
    set('out-religion', data.religion);
    set('out-contactnumber', data.contactnumber);
    set('out-email', data.email);
    set('out-homeaddress', data.homeaddress);
    set('out-e-name', data['e-name']);
    set('out-e-relation', data['e-relation']);
    set('out-e-contactnumber', data['e-contactnumber']);
    set('out-username', data.username);

    if (data.imageDataUrl) {
        document.getElementById('out-image').src = data.imageDataUrl;
    } else {
        document.getElementById('out-image').style.display = 'none';
    }
});