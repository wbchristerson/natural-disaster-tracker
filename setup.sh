psql -c "
    DELETE FROM witnessreports WHERE true;
    DELETE FROM disasters WHERE true;
    DELETE FROM observers WHERE true;
    INSERT INTO disasters (informal_name, official_name, disaster_type, is_ongoing, location_latitude, location_longitude)
        VALUES ('Hurricane Sandy', 'Hurricane Sandy', 'HURRICANE', false, 33.758884, -77.378128),
               ('2005 Nias-Simeulue Earthquake', '2005 Nias-Simeulue Earthquake', 'EARTHQUAKE', false, 2.09, 97.15);
    INSERT INTO observers (username, photograph_url)
        VALUES ('watcher', 'https://www.toocool2betrue.com/content/142065/e473256bce80e755d09b347924d96fd9.jpg'),
               ('weather reporter', 'https://cdn.vox-cdn.com/thumbor/tZLxhLAWoEFRpf0pe-CirjvF0XY=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15788040/20150428-cloud-computing.0.1489222360.jpg');
    INSERT INTO witnessreports (disaster_id, observer_id, event_datetime, severity, image_url, comment, people_affected, location_latitude, location_longitude)
        VALUES (1, 1, '2012-10-29 10:38:12-04', 7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flooding_in_Marblehead_Massachusetts_caused_by_Hurricane_Sandy.jpg/2560px-Flooding_in_Marblehead_Massachusetts_caused_by_Hurricane_Sandy.jpg', 'There is severe flooding in Marblehead, MA.', 2000, 42.485614, -70.871763),
               (1, 2, '2012-10-30 08:01:10-04', 3, 'https://i.pinimg.com/originals/b3/a4/22/b3a422ab115e03e33c76df7a3e673eb5.jpg', 'Flooding remains on Staten Island in New York and several houses are damaged.', 10000, 40.578706, -74.096720);
    SELECT * FROM disasters" sample-capstoneDB postgres