# Сourse project


Тех задание на курсовой проект

Тема: todo-list.

Требования к приложению и его функциональность

•	Приложение должно быть написано с использованием javascript
•	Недопустимо использовать фреймворки и библиотеки
•	Single page application
  o	Приложение должно работать в пределах одной html страницы
  o	Для реализации любой функциональности недопустимо делать переходы между html страницами, редирект пользователя на backend скрипты, нативный сабмит формы на backend скрипты и т.д.
  o	Имитация переходов по страницам приложения должна осуществляться исключительно только за счет DOM манипуляций
•	Авторизация
  o	приложение должно быть разделено на 2 “страницы” (здесь и далее имеются в виду компоненты которые будут отображаться пользователю в тех или иных условиях за счет dom манипуляций, а не реальные html страницы)
  o	должна быть страница логина и страница с самим todo списком
  o	todo список должен быть виден пользователю только когда он залогинился в приложении
  o	допустимо хранить информацию об авторизации (auth token) в local storage либо cookie
  o	логин должен осуществляться через ajax. данные с формы логина должны быть собраны и отправлены post запросом на сервер. сервер в ответ будет присылать токен авторизации.
  o	после того как токен получен, пользователю можно будет отобразить часть приложения с todo списком
  o	компонент todo списка при своей инициализации должен проверять авторизован ли пользователь и “перенаправлять” (за счет dom манипуляций) его на компонент логина. если страница была перезагружена и у пользователя есть токен авторизации, его нужно “валидировать” послав на сервер соответствующий запрос. если токен верный, пользователю нужно отобразить компонент с todo списком
•	получение записей todo
  o	при появлении компонента todo списка, все записи должны быть подгружены с backend при помощи соответствующего get ajax запроса
  o	записи должны отображаться в порядке и создания сверху вниз - от новых к старым.
  o	записи должны представлять из себя прямоугольники (допускается стилизации внутри самих прямоугольников по усмотрению)
•	добавление новых записей в список
  o	todo список должен предоставлять пользователю добавить новую запись при помощи input поля, которое должно располагаться над списком записей. запись должна добавляться в список либо по нажатию на enter либо по нажатию на соответствующую кнопку добавления.
  o	после добавления новой записи на backend должен быть послан соответствующий post ajax запрос
  o	когда добавляется новая запись в список, в dom она должна появится перед предыдущими записями (новые в начале списка, старые - в конце)


•	удаление записей из списка
  o	на каждом элементе записи при наведении мышкой, должна отобразится кнопка удаления. по нажатию на кнопку, запись должна быть удалена из списка
  o	после удаления записи на backend должен быть послан соответствующий delete ajax запрос
•	отметка сделанных заданий из todo списка
  o	на каждом элементе записи при наведении мышкой, должна отобразится кнопка отметки о выполнении. по нажатию на кнопку, запись должна быть отмечена как выполнена (запись не должна удаляться из списка). в качестве отметки выполненных записей допускается произвольная стилизация, единственное требование - они должны явно отличаться от невыполненных (например: другой цвет, перечеркнутый текст и т.д.)
  o	после отметки о завершении записи на backend должен быть послан соответствующий put ajax запрос
•	редактирование
  o	по нажатие на произвольный элемент в списке, обычный текст должен быть заменен input полем для редактирования названия записи
  o	после редактирования записи на backend должен быть послан соответствующий put ajax запрос
  o	далее эта запись должна отображаться с таким названием, на которое было отредактировано пользователем
•	фильтры
  o	над списком записей должны быть кнопки фильтров “незавершенные”, “завершенные”, все
  o	по нажатию на “завершенные” в списке должны отображаться только те записи которые были завершены 
  o	по нажатию на “незавершенные” в списке должны отображаться только те записи которые не были завершены 
  o	по нажатию на “все” в списке должны отображаться все записи
•	справа от списка должны быть счетчики всех записей, завершенных, незавершенных
  o	счетчики должны обновляться динамически при добавлении/удалении записей, а также при отметке завершения
•	все ui элементы должны быть разделены по отдельным классам/функциям.
  o	класс ui компонента должен отвечать только за отображение информации в dom и за dom манипуляции, и не должен хранить данные или состояние todo списка
  o	класс ui компонента не должен самостоятельно обновлять данные или изменять содержимое todo списка
  o	ui компоненты могут генерировать сообщения для класса хранения состояни (о нем далее)
  o	ui компоненты могут подписываться на изменения состояния из класса хранения состояни (о нем далее)
  o	пример разделение по классам
    	компонент формы логина
    	компонент ввода нового элемента списка
    	компонент списка
    	компонент элемента списка
    	компонент кнопок (которые отображаются на элементе при наведении)
    	и т.д.

•	за манипуляцию данными должен отвечать отдельный класс
  o	класс должен хранить данные о todo списке
  o	должен иметь интерфейс для прослушки сообщений, и изменять свое состояние в соответствии с конкретным сообщением
  o	класс должен предоставлять возможность подписки на изменение состояния
•	за что можно получить дополнительные баллы?
  o	чистота в коде
    	небольшие функции максимум 5-9 строк
    	небольшие классы максимум 50-70 строк сконцентрированные на конкретной задаче
    	понятные и читаемые названия для функций, переменных, классов
  o	использование встроенных методов (вместо for/while для прохода по массиву использовать map, reduce, filter и т.д.)
  o	комментарии к сложным участкам кода
  o	избегание неочевидных и запрещенных конструкций (eval, with, и т.д.)
  o	использование паттернов для организации кода (singleton для хранения данных об авторизации, observer для отслеживание изменения состояния и перерисовки dom и т.д.)
  o	интуитивно понятный ui/ux приложения
  o	приложение которое можно глянуть онлайн (доступно на каком то хостинге например heroku)
