document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    // 1. Kiểm tra mật khẩu khớp
    if (password !== confirm) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    // 2. Kiểm tra độ dài mật khẩu (tùy chọn)
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // 3. Lấy danh sách user từ LocalStorage
    let users = JSON.parse(localStorage.getItem('app_users')) || [];

    // 4. Kiểm tra email tồn tại chưa
    if (users.find(user => user.email === email)) {
        alert("Email này đã được đăng ký trước đó!");
        return;
    }

    // 5. Thêm user mới
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password // Lưu ý: thực tế cần mã hóa mật khẩu
    };

    users.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(users));

    // 6. Thông báo thành công và chuyển hướng
    alert("Đăng ký thành công! Hãy đăng nhập để bắt đầu.");
    window.location.href = 'login.html'; 
});