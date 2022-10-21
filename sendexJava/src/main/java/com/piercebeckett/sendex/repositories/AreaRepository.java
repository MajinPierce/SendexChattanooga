package com.piercebeckett.sendex.repositories;

import com.piercebeckett.sendex.domain.Area;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends CrudRepository<Area, String> {

    Area findByAreaName(String areaName);
}
