# 플러터의 상호작용 중 Gesture란?

Created by: Boyeon Kim
Created time: November 21, 2023 10:22 PM
Tags: Frontend Study

## 제스처 관련 위젯

- flutter에서 제스처 시스템은 두가지 레이어로 나뉨
    - `raw pointer events` : 포인터의 움직임과 위치를 기술함
        - 터치, 마우스, 스타일러스 펜
    - `gesture` : 액션, 하나 이상의 포인터 움직임으로 구성됨

[Taps, drags, and other gestures](https://docs.flutter.dev/ui/interactivity/gestures)

## Pointers

- `PointerDownEvent` : 포인터가 화면의 특정 위치에 가는 것
- `PointerMoveEvent` : 포인터가 한 위치에서 다른 위치로 이동하는 것
- `PointerUpEvent` : 포인터가 화면에 더이상 접촉하지 않는 것
- `PointerCancelEvent` : 포인터의 입력이 더이상 이 앱을 향하지 않는 것

> 터치가 되면, (on pointer down), hit test 라는 것이 일어난다.
프레임워크는 화면에 어떤 위젯이 존재하는지 확인한 뒤,
포인터 다운 이벤트와 후속 이벤트가 히트 테스트에서 찾은 가장 안쪽 위젯으로 전송된다.
이벤트는 트리를 따라 가장 안쪽 위젯에서 트리의 루트 경로에 있는 모든 위젯에 발송된다.
위젯 레이어에서 직접 포인터 이벤트를 수신하려면 리스너 위젯을 사용해도 되지만, 일반적으로는 제스처를 대신 사용하는 것이 좋음. 👍
> 

## Gestures

- 의미론적인 액션을 표현

## Tap

- `onTapDown` : 터치가 일어난 것(탭을 트리깅하는 포인터가 화면의 특정 위치에 컨택한 것)
- `onTapUp` : 터치 손가락을 뗀 것(탭을 트리깅하는 포인터가 특정 위치에서 컨택이 멈춘 것)
- `onTap` : `onTapDown` 과 `onTapUp` 이 연결되어 `onTap` 이 발생하게 된다
- `onTabCancel` : 이전에 `onTapDown` 을 트리깅 했던 포인터가 `onTab` 을 일으키지 않은 경우(경고 창이 뜨거나 했을 때인듯)

## DoubleTap, Long press, Vertical drags, Horizontal drags

- 이름만 봐도 알테니 따로 작성 안함

## Pan

- `onPanStart` : 수평 혹은 수직으로 드래그를 시작했을 때
- `onPanUpdate` : 수평 혹은 수직으로 드래그 중일 때(드래그 위치가 업데이트 되는 중일때)
- `onPanEnd` : 수평 혹은 수직으로 드래그를 끝냈을 때

## Scale

- `onScaleStart` : 확대를 시작했을 때
- `onScaleUpdate` : 확대 중일 때 (드래그 위치가 업데이트 되는 중일 때)
- `onScaleEnd` : 확대를 끝냈을 때

## InkWell

- Material UI 에 기본으로 들어가있는 물결처럼 퍼지는 효과

## 제스처의 모호성

- 화면의 특정 위치에 여러개의 제스처 인식기가 있을 수 있다
- 화면에 지정된 포인터에 대해 제스처 인식기가 두 개 이상 있다면, 프레임워크는 각 인식기가 제스처 영역에 참여하도록 해서 사용자가 의도하는 제스처를 명확히 구분하려 한다.
    - 두 개가 동시에 발현되지 않음
    - 이를 제스처 아레나 라고 함
- 제스처 아레나에서는 다음 두 규칙에 의해 어떤 제스처가 승리할지 결정
    - 제스처 인식기는 언제든 스스로를 제거할 수 있음
    - 제스처 인식기 중 하나가 자신을 승리자로 선언하면 나머지 모든 인식기가 패배함
- ex ) 수평과 수직 인식기 두개가 결합한다면 좌표를 판단하여 수직으로 혹은 수평으로 더 많이 움직였는지를 판단하고 승자를 정한다
    - 인식기가 하나만 있을 때는 바로 수평 혹은 수직 드래그로 인식시킬 수 있지만, 제스처 아레나가 열리는 경우 드래그가 끝나야 알 수 있다.