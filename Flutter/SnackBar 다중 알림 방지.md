# SnackBar 다중 알림 방지

Created by: Boyeon Kim
Created time: November 23, 2023 4:38 PM
Tags: Frontend Study

### ☠️ 스낵바 설정되어있는 버튼을 여러차례 누르면 그 횟수만큼 계속해서 창이 나옴

## ✨ 해결방법 !!

```dart
if (Get.isSnackbarOpen) {

} else {
	Get.snackbar("저장 실패", "빈칸 없이 채워주세요",
			colorText: Mycolor().snackbarText,
			snackPosition: SnackPosition.TOP,
      backgroundColor: Mycolor().snackbarBg,
      icon: const Icon(Icons.warning_amber));
}
```

- 위 코드와 같이 if문을 한 번 걸어서 현재 snackbar가 떠있는 상황인지 확인 후 기능을 수행하도록 변경해줘야함.