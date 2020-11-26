psql -c "
    DELETE FROM disasters WHERE true;
    DELETE FROM observers WHERE true;
    INSERT INTO disasters (id, informal_name, official_name, disaster_type, is_ongoing, location_latitude, location_longitude)
        VALUES (1, 'Hurricane Sandy', 'Hurricane Sandy', 'HURRICANE', false, 33.758884, -77.378128);
    INSERT INTO observers (id, username, photograph_url)
        VALUES(1, 'watcher', 'https://www.toocool2betrue.com/content/142065/e473256bce80e755d09b347924d96fd9.jpg');
    INSERT INTO witnessreports (id, disaster_id, observer_id, event_datetime, severity, image_url, comment, people_affected, location_latitude, location_longitude)
        VALUES (1, 1, 1, '2012-10-29 10:38:12-04', 7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flooding_in_Marblehead_Massachusetts_caused_by_Hurricane_Sandy.jpg/2560px-Flooding_in_Marblehead_Massachusetts_caused_by_Hurricane_Sandy.jpg', 'There is severe flooding in Marblehead, MA.', 2000, 42.485614, -70.871763);
    SELECT * FROM disasters" sample-capstoneDB postgres