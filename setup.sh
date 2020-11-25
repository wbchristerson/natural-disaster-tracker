psql -c "DELETE FROM disasters WHERE true;
    INSERT INTO disasters (id, informal_name, official_name, disaster_type, is_ongoing, location_latitude, location_longitude)
        VALUES (1, 'Hurricane Sandy', 'Hurricane Sandy', 'HURRICANE', false, 33.758884, -77.378128);
    SELECT * FROM disasters" sample-capstoneDB postgres