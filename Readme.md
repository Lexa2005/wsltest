<h1>Docker + Nginx + Vue3.js + PostgreSQL + Swagger + Redis</h1>
<h2>Система предназначенная
для туристов и гостей Калининграда</h2>

<h2>Запуск и настройка проекта</h2>
<h3>Поднимать все сугубо в докере, десктоп поднимать отдельно!!!</h3>

<hr/>

**Первый запуск docker-compose (Сборка проекта)**
> `
sudo docker-compose up -d --build
`
>
**Запуск миграций (Наполнение базы данных)***
> `sudo docker exec -it kvd_app bash -c "cd migration && php migration.php"`
>
**Запуск проекта**
> `sudo docker-compose up -d`

**Поднимаем Frontend (Админку)**
> `sudo docker exec -it kvd_app bash -c "cd ./public/ && npm run build && npm run serve"`

-----------
Разработка
-----------

**Действия с контейнерами**

Запуск проекта: `docker-compose up -d`

Остановка проекта: `docker-compose stop`

Перезапуск определенного контейнера: `docker-compose restart <ИМЯ_КОНТЕЙНЕРА>`

Вход в терминал определенного контейнера: `docker exec -it <ИМЯ_КОНТЕЙНЕРА> bash`

-----------
Api documentation
-----------
<table>
    <tr>
        <th>USER</th>
        <th>EVENTS</th>
        <td>ORDER</td>
    </tr>
    <tr>
        <td>/api/user/get</td>
        <td>/api/events/get</td>
        <td>/api/order/get</td>
    </tr>
    <tr>
        <td>/api/user/get/{id}</td>
        <td>/api/events/get/{id}</td>
        <td>/api/order/get/{id}</td>
    </tr>
    <tr>
        <td>/api/user/registration</td>
        <td>/api/events/add</td>
        <td>/api/order/add</td>
    </tr>
    <tr>
        <td>/api/user/edit</td>
        <td>/api/events/edit</td>
        <td>/api/order/edit</td>
    </tr>
</table>