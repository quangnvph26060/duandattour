<x-mail::message>
# Chúc mừng bạn dã lấy lại mật khẩu thành công.
Xin chào {{$user->name}}, <br>
Mật khẩu mới cho tài khoản của bạn là: {{ $password }} <br>
Hãy đăng nhập với mật khẩu này và đổi mật khẩu sau khi đăng nhập.
<x-mail::button :url="'http://localhost:5173/login'">
Đăng nhập
</x-mail::button>

Thanks,{{$user->name}}<br>
{{ config('app.name') }}
</x-mail::message>