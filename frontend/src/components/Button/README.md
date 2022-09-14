# button props

<br><br>

### style option

- width
  
  ​	default: "130px"
- height
  
  ​	default: "42px"
- bg

  ​	default: "--grey-750"
- color

  ​	default: "--grey-100"
- borderRadius

  ​	default: "2px"
- borderWidth

  ​	default: "0px"
- borderColor

  ​	default: "--grey-750"

<br>

ex)

```tsx
<Button
        width="150px"
        height="150px"
        bg="--grey-300"
        color="--grey-400"
        borderRadius="10px"
        borderWidth="2px"
        borderColor="--grey-750"
      >  
</Button>
```



<br><br>

### button title

ex)

```tsx
<button>title</button>
```

<br><br>

### props function

<br>

- 상태 관리 함수

ex)

```tsx
import { useState } from "react";

...

const [data, setData] = useState<number>(0);

const onIncrease = () => setData(data + 1);
const onDecrease = () => setData(data - 1);


...

<SharpButton onClick={onIncrease}>+1</SharpButton>
<SharpButton onClick={onDecrease}>-1</SharpButton>
```

<br>

- 라우터 이동 함수

ex)

```tsx
import { useNavigate } from "react-router-dom";

...

const navigate = useNavigate();
const goGallery = () => {
  navigate("/gallery");
};

...

<Button onClick={goGallery}>
  Gallery
</Button>
```

