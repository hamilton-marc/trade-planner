package com.unionhills.tradeplanner.repository;

import com.unionhills.tradeplanner.domain.PlanTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PlanTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanTransactionRepository extends JpaRepository<PlanTransaction, Long> {}
