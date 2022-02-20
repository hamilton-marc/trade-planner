package com.unionhills.tradeplanner.repository;

import com.unionhills.tradeplanner.domain.TradingPlan;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TradingPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TradingPlanRepository extends JpaRepository<TradingPlan, Long> {
    @Query("select tradingPlan from TradingPlan tradingPlan where tradingPlan.user.login = ?#{principal.username}")
    List<TradingPlan> findByUserIsCurrentUser();
}
