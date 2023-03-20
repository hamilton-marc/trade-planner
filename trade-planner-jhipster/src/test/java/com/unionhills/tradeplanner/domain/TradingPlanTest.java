package com.unionhills.tradeplanner.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.unionhills.tradeplanner.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TradingPlanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TradingPlan.class);
        TradingPlan tradingPlan1 = new TradingPlan();
        tradingPlan1.setId(1L);
        TradingPlan tradingPlan2 = new TradingPlan();
        tradingPlan2.setId(tradingPlan1.getId());
        assertThat(tradingPlan1).isEqualTo(tradingPlan2);
        tradingPlan2.setId(2L);
        assertThat(tradingPlan1).isNotEqualTo(tradingPlan2);
        tradingPlan1.setId(null);
        assertThat(tradingPlan1).isNotEqualTo(tradingPlan2);
    }
}
