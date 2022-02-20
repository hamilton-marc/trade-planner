package com.unionhills.tradeplanner.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.unionhills.tradeplanner.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanTransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanTransaction.class);
        PlanTransaction planTransaction1 = new PlanTransaction();
        planTransaction1.setId(1L);
        PlanTransaction planTransaction2 = new PlanTransaction();
        planTransaction2.setId(planTransaction1.getId());
        assertThat(planTransaction1).isEqualTo(planTransaction2);
        planTransaction2.setId(2L);
        assertThat(planTransaction1).isNotEqualTo(planTransaction2);
        planTransaction1.setId(null);
        assertThat(planTransaction1).isNotEqualTo(planTransaction2);
    }
}
