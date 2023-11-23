# Enum - dart 문법

Created by: Boyeon Kim
Created time: November 23, 2023 2:10 PM
Tags: Frontend Study

## enum 이란?

- 한 변수 안에 여러 가지 옵션을 제공하는 것
- 🌟 문자열을 직접 비교하는 방법은 가능하면 피해야하는 코딩 스타일임!! 특히 로직 중에 문자열을 직접 비교하는 방법은 사용하지 않는 것이 좋다. **가능하면 enum을 사용할 수 있도록 하자**

## enum의 기본 사용법

예를 들어 아래와 같이 공지사항 게시판, 자유게시판으로 게시판이 타입이 구분된다고 가정해보자. enum을 사용하면 아래와 같이 선언해서 사용할것이다.

```dart
enum BoardType { notice, free, undefined }
```

문자열을 직접 비교하는 방법 vs enum 타입을 비교하는 방법

```dart
// BAD
// board 모델에서 string 타입의 type 변수를 사용할 경우
if (board.type == "notice") {
   ...
} else if (board.Type == "free") {
  .....
} else {
....
}

// GOOD
// enum 형식으로 type 변수를 사용할 경우
if(board.type == BoardType.notice) {
	...
} else if (board.type == BoardType.free) {
	...
} else {
	...
}
```

### 💥 Dart에서 String을 enum으로 바로 변환할 수 없다.!

dart에서는 서버 API 등에서 받은 string형식의 값을 enum으로 변환하는 별도의 기능을 제공하지 않아 string 값을 enum으로 변환하는데 불편함이 있다.

서버로부터 게시판 목록을 가져오는 API에서 아래와 같은 결과를 받았다고 가정해보자.

이 응답 값을 앱에서 사용하기 위해서는 적당한 모델 클래스로 변환해야 할 것이다.

```dart
// API response - JSON

"boaders"  : [
    {
      "id" : "notice01",
      "title" : "공지사항",
       "type" : "notice",
       .....
    }, 
    {
      "id" : "free01",
      "title" : "자유게시판",
       "type" : "free",
       .....
    }, 
]
```

위 결과 값을 아래 Border 클래스로 변환한다고 가정해보자

Board 클래스의 type 필드는 API에서는 문자열 “notice”임으로 `parseToBoardType` 함수와 같이 string 형식의 값을 BoardType으로 변화하는 과정이 필요함

```dart
// Board Model
class Board {
	final String id;
	final String title;
	final BoardType type;
}

// value를 입력받아 BoaderType으로 변환함
BoardType parseToBoardType(String value) {
	if(value == "notice") {
		return BoardType.notice;
	} else if (value == "free") {
		return BoardType.free;
	} 
	return BoardType.undefined;
}
```

dart 2.17 이후부터는 아래와 같이 extension 도움 없이 enum 편하게 사용 가능

```dart
enum BoardType {
  notice('notice', '공지사항'),
  free('free', '자유게시판'),
  undefined('undefined', '');
  
  const BoardType(this.code, this.displayName);    
  final String code;
  final String displayName;  
  
  factory BoardType.getByCode(String code){
    return BoardType.values.firstWhere((value) => value.code == code, 
                                        orElse: () => BoardType.undefined);
  }
}
```

### 참고 링크

[열거 타입](https://dart-ko.dev/language/enum)

[[Flutter/Dart] dart에서 열거형(enum) 의 효율적인 변환과 활용](https://ctoahn.tistory.com/27)